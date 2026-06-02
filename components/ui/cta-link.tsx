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
    </Link>
  );
}

