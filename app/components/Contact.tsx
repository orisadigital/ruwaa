"use client";

import type { FormEvent } from "react";

// The number the footer already links to.
const WHATSAPP = "60192396373";
const MAP_QUERY = "RUWAA Residence";

export default function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      `Nama: ${name}`,
      `No. telefon: ${phone}`,
      "",
      message,
    ].filter((line) => line !== undefined);

    // Opens WhatsApp with the enquiry prefilled; the visitor still presses send.
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="contact">
      <div className="contact-map">
        <iframe
          title={`Peta lokasi ${MAP_QUERY}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="contact-panel">
        <p className="contact-kicker">
          <span className="contact-kicker-dot" aria-hidden="true" />
          Hubungi kami
        </p>
        <h2 className="contact-title">Hantar pertanyaan</h2>

        <form className="contact-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">Nama</span>
            <input name="name" type="text" required autoComplete="name" />
          </label>

          <label className="field">
            <span className="field-label">No. telefon</span>
            <input name="phone" type="tel" required autoComplete="tel" />
          </label>

          <label className="field">
            <span className="field-label">Mesej</span>
            <textarea name="message" rows={4} required />
          </label>

          {/* Same parts as ActionButton's primary variant, so it wipes,
              rolls its label and sweeps its arrow identically. */}
          <button type="submit" className="btn btn-primary">
            <span className="btn-wipe" aria-hidden="true" />
            <span className="btn-label-mask">
              <span className="btn-label">Hantar ke WhatsApp</span>
            </span>
            <span className="btn-icon" aria-hidden="true">
              <span className="btn-icon-wrap">
                <span className="btn-icon-track">
                  {[0, 1].map((i) => (
                    <svg
                      key={i}
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
                  ))}
                </span>
              </span>
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
