"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Utama" },
  { href: "/perihal", label: "Perihal" },
  { href: "/rehab", label: "Rehab" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? "nav-link active" : "nav-link"}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
