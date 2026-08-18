import Link from "next/link";
import styles from "./cta-link.module.css";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  compact?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  compact = false,
  onClick,
}: CtaLinkProps) {
  const className = [
    styles.link,
    variant === "ghost" ? styles.ghost : styles.primary,
    compact ? styles.compact : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
      {/* La firma del brand — la luce che percorre il contorno del logo —
          orbita anche attorno all'azione principale: l'occhio cade lì. */}
      {variant === "primary" && (
        <span className={styles.trace} aria-hidden="true">
          <i />
        </span>
      )}
    </Link>
  );
}
