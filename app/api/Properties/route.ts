import { NextRequest } from "next/server";
import { sanitizeFilters, validateCreatePropertyPayload } from "@/app/lib/validation";
import { API_CONFIG } from "@/app/config/api";

const baseURL = API_CONFIG.baseURL;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    if (!baseURL) return Response.json({ succeeded: false, message: "Missing NEXT_PUBLIC_API_URL" }, { status: 500 });
    const query = new URLSearchParams(sanitizeFilters(Object.fromEntries(searchParams.entries()))).toString();
    const res = await fetch(`${baseURL}/api/Properties${query ? `?${query}` : ""}`, { cache: "no-store" });
    if (!res.ok) {
      const details = await safeJson(res);
      return Response.json({ succeeded: false, message: res.statusText, details }, { status: res.status });
    }
    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (err: any) {
    const isConn = err?.code === "ECONNREFUSED";
    return Response.json({ succeeded: false, message: isConn ? "Upstream service unavailable" : "Network error" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { valid, errors } = validateCreatePropertyPayload(body);
  if (!valid) return Response.json({ succeeded: false, message: "Invalid payload", errors }, { status: 400 });
  try {
    const mappedBody: Record<string, unknown> = {
      Name: body.name,
      Address: body.address,
      Price: Number(body.price),
      CodeInternal: body.codeInternal,
      Year: Number(body.year),
      IdOwner: body.idOwner,
    };
    if (!baseURL) return Response.json({ succeeded: false, message: "Missing NEXT_PUBLIC_API_URL" }, { status: 500 });
    const res = await fetch(`${baseURL}/api/Properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mappedBody),
    });
    const details = await safeJson(res);
    if (!res.ok) return Response.json({ succeeded: false, message: details?.message || res.statusText, details }, { status: res.status });
    return Response.json(details, { status: 200 });
  } catch (err: any) {
    const isConn = err?.code === "ECONNREFUSED";
    return Response.json({ succeeded: false, message: isConn ? "Upstream service unavailable" : "Network error" }, { status: 502 });
  }
}

async function safeJson(resp: Response) {
  try {
    return await resp.json();
  } catch {
    return undefined;
  }
}


