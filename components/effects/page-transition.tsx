"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Ogni cambio pagina rimonta il contenitore (key = percorso): la CSS fa
// entrare il contenuto nuovo con un movimento (.fx-page in app/motion.css),
// mentre lo spazio dietro fa il "warp" (NebulaField). Solo transform/opacity.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="fx-page">
      {children}
    </div>
  );
}
