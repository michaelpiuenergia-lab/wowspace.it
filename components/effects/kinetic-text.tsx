import { Fragment, type CSSProperties } from "react";

type KineticTextProps = {
  text: string;
  /** classe sul contenitore (es. "fx-fill" per il testo che si accende) */
  className?: string;
  /** classe su ogni parola (contenitore con overflow nascosto per lo slide) */
  wordClassName?: string;
  /** classe sull'elemento interno che si muove (se assente, la parola è "piatta") */
  innerClassName?: string;
  /** indice di partenza per lo stagger (--i) */
  start?: number;
};

// Spezza un testo in PAROLE, ognuna in uno <span> con il proprio indice (--i)
// per lo stagger delle animazioni. Il testo resta testo vero nel DOM: Google e
// gli screen reader lo leggono come una frase normale. Componente server:
// nessun JS spedito al browser.
// Gli spazi stanno FUORI dagli span delle parole (che sono inline-block: uno
// spazio finale al loro interno verrebbe collassato e le parole si
// attaccherebbero).
export function KineticText({
  text,
  className,
  wordClassName,
  innerClassName,
  start = 0,
}: KineticTextProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className={wordClassName}
            style={{ "--i": index + start } as CSSProperties}
          >
            {innerClassName ? (
              <span className={innerClassName}>{word}</span>
            ) : (
              word
            )}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
