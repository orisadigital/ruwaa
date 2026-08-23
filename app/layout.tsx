import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ActionButton from "./components/ActionButton";
import Footer from "./components/Footer";
import HeaderBar from "./components/HeaderBar";
import Nav from "./components/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Fallback for GT Ultra Median (licensed, not bundled) — see ./fonts/README.md
const headingFallback = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-heading-fallback",
});

export const metadata: Metadata = {
  title: "Ruwaa",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ms" className={`${inter.variable} ${headingFallback.variable}`}>
      <body>
        <div className="shell">
          <HeaderBar>
            <Nav />
            <Link href="/" className="logo">
              <Image
                src="/logo.png"
                alt="Ruwaa"
                width={88}
                height={88}
                priority
              />
            </Link>
            <div className="header-right">
              <ActionButton href="/daftar">Daftar Sekarang</ActionButton>
            </div>
          </HeaderBar>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
