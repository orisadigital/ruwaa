import Link from "next/link";

const SITEMAP = [
  { href: "/", label: "Utama" },
  { href: "/perihal", label: "Perihal" },
  { href: "/rehab", label: "Rehab" },
  { href: "/daftar", label: "Daftar Sekarang" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="footer-contact">
          <p className="footer-label">Hubungi Kami</p>
          <p className="footer-lines">
            <a href="tel:+60192396373">+6019 239 6373</a>
          </p>
        </div>

        <nav className="footer-col">
          <p className="footer-label">Peta Laman</p>
          <ul>
            {SITEMAP.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col">
          <p className="footer-label">Media Sosial</p>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </nav>

        <div className="footer-hours">
          <p className="footer-label">Maklumat Lanjut</p>
          <p>
            Hubungi pihak RUWAA Residence secara terus untuk mendapatkan
            maklumat lanjut mengenai proses permohonan, penilaian dan kemasukan.
          </p>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        RUWAA Residence
      </p>

      <div className="footer-bottom">
        <a href="#">Dasar Privasi</a>
        <a href="#">Kuki</a>
        <span className="footer-credit">
          © RUWAA Residence 2026 |{" "}
          <a
            href="https://orisadigital.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Orisa Digital
          </a>
        </span>
      </div>
    </footer>
  );
}
