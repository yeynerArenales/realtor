import { ReactNode } from "react";
import { Heading } from "../atoms";

interface ErrorLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ErrorLayout({
  title,
  subtitle,
  children,
}: ErrorLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full text-center space-y-1">
        <div className="space-y-3">
          <Heading as="h2" variant="xl">
            {title}
          </Heading>
          <p className="text-stone-600 text-sm sm:text-base">{subtitle}</p>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
