"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  type?: "user" | "image";
}

export default function ImageFallback({
  src,
  alt,
  className = "",
  type = "user",
}: ImageFallbackProps) {
  const [imgError, setImgError] = useState(false);

  const placeholderUser = (
    <svg
      className={`w-full h-full bg-stone-200 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  const placeholderImage = (
    <svg
      className={`w-full h-full bg-stone-200 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clipRule="evenodd"
      />
    </svg>
  );

  const placeholder = type === "user" ? placeholderUser : placeholderImage;

  if (imgError || !src) {
    return placeholder;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setImgError(true)}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}
