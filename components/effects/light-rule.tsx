import type { CSSProperties } from "react";

type LightRuleProps = {
  className?: string;
  /** sfasa la scintilla rispetto alle altre righe (secondi) */
  delay?: number;
};

// Divisore sottile con una scintilla di luce che lo percorre: la firma del
// logo (la luce sul contorno dell'esagono) applicata alle sezioni. Solo CSS,
// vedi .fx-rule in app/motion.css.
export function LightRule({ className = "", delay = 0 }: LightRuleProps) {
  return (
    <div
      className={`fx-rule ${className}`.trim()}
      style={{ "--fx-delay": `${delay}s` } as CSSProperties}
      aria-hidden="true"
    >
      <i />
    </div>
  );
}
