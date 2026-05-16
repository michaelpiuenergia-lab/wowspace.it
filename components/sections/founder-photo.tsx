"use client";

import Image from "next/image";
import { useState } from "react";

type FounderPhotoProps = {
  src: string;
  alt: string;
  className: string;
  fallbackClassName: string;
  initials: string;
};

export function FounderPhoto({
  src,
  alt,
  className,
  fallbackClassName,
  initials,
}: FounderPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={fallbackClassName} role="img" aria-label={alt}>
        <span aria-hidden="true">{initials || "·"}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 900px) 80vw, 28rem"
      className={className}
      priority={false}
      onError={() => setFailed(true)}
    />
  );
}
