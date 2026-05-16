import Link from "next/link";
import styles from "./cta-link.module.css";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  compact?: boolean;
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  compact = false,
}: CtaLinkProps) {
  const className = [
    styles.link,
    variant === "ghost" ? styles.ghost : styles.primary,
    compact ? styles.compact : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

