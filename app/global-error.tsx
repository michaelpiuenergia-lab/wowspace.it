"use client";

import { useEffect } from "react";

// Error boundary GLOBALE: scatta solo se il root layout stesso va in errore.
// Deve renderizzare <html> e <body> e non può dipendere dagli stili del sito,
// quindi usa stili inline minimi (tema scuro coerente).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#040508",
          color: "#f6f7fb",
          fontFamily:
            '"Sora", "Segoe UI", system-ui, -apple-system, sans-serif',
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "30rem" }}>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Qualcosa è andato storto.
          </h1>
          <p style={{ color: "#9ca8bd", marginTop: "1rem", fontSize: "1rem" }}>
            Si è verificato un errore imprevisto. Riprova a ricaricare la
            pagina.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "1.6rem",
              padding: "0.7rem 1.4rem",
              borderRadius: "999px",
              border: "1px solid rgba(21, 212, 255, 0.55)",
              background: "rgba(21, 212, 255, 0.16)",
              color: "#f6f7fb",
              font: "inherit",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Ricarica
          </button>
        </div>
      </body>
    </html>
  );
}
