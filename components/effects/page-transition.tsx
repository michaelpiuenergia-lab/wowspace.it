"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

// Ogni cambio pagina rimonta il contenitore (key = percorso): la CSS fa
// entrare il contenuto nuovo con un movimento (.fx-page in app/motion.css),
// mentre lo spazio dietro fa il "warp" (NebulaField). Solo transform/opacity.
// Tiene anche traccia della pagina da cui si arriva (sessionStorage): la
// galassia in home la usa per il volo di ritorno sul pianeta giusto.
export const PATH_KEY = "ws-path";
export const PREV_PATH_KEY = "ws-prev-path";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    try {
      const cur = sessionStorage.getItem(PATH_KEY);
      if (cur !== pathname) {
        sessionStorage.setItem(PREV_PATH_KEY, cur ?? "");
        sessionStorage.setItem(PATH_KEY, pathname);
      }
    } catch {
      // storage non disponibile: nessun volo di ritorno, nient'altro cambia
    }
  }, [pathname]);
  return (
    <div key={pathname} className="fx-page">
      {children}
    </div>
  );
}
