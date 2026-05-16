"use client";

import { openCookiePreferences } from "@/components/legal/cookie-consent";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function CookiePrefsButton({ className = "", children }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => openCookiePreferences()}
    >
      {children}
    </button>
  );
}
