import Link from "next/link";
import type { ReactNode } from "react";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "cream";
};

export default function ActionButton({
  href,
  children,
  variant = "primary",
}: Props) {
  const label = typeof children === "string" ? children : undefined;

  // Ghost and cream are plain links: no wipe, no rolling label, no arrow.
  if (variant !== "primary") {
    return (
      <Link href={href} className={`btn btn-${variant}`} aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className="btn btn-primary" aria-label={label}>
      <span className="btn-wipe" aria-hidden="true" />
      <span className="btn-label-mask">
        <span className="btn-label">{children}</span>
      </span>
      <span className="btn-icon" aria-hidden="true">
        <span className="btn-icon-wrap">
          <span className="btn-icon-track">
            <Arrow />
            <Arrow />
          </span>
        </span>
      </span>
    </Link>
  );
}
