import { CreatePropertyData } from "@/app/services/types";

export function validateCreateOwnerPayload(payload: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!payload || typeof payload !== "object") errors.push("invalid payload");
  if (!payload?.name || typeof payload.name !== "string") errors.push("name is required");
  if (!payload?.address || typeof payload.address !== "string") errors.push("address is required");
  if (!payload?.birthday || typeof payload.birthday !== "string") errors.push("birthday is required");
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}

export function validateCreatePropertyPayload(payload: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  const p = payload as Partial<CreatePropertyData>;
  if (!p?.name) errors.push("name is required");
  if (!p?.address) errors.push("address is required");
  if (typeof p?.price !== "number") errors.push("price must be a number");
  if (!p?.codeInternal) errors.push("codeInternal is required");
  if (typeof p?.year !== "number") errors.push("year must be a number");
  if (!p?.idOwner) errors.push("idOwner is required");
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}

export function sanitizeFilters(input: Record<string, string | undefined>) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(input)) {
    if (v !== undefined && v !== "") out[k] = v;
  }
  return out;
}


