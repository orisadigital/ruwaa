"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const HIDE_AFTER = 120;

export default function HeaderBar({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Read inside the scroll handler without re-registering the listener.
  const openRef = useRef(false);
  openRef.current = menuOpen;

  // Close the panel once the viewport is wide enough for the full header.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 801px)");
    const onChange = () => {
      if (wide.matches) setMenuOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const goingDown = y > last;
      last = y;
      setHidden(goingDown && y > HIDE_AFTER && !openRef.current);
      setStuck(y > 8);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "header",
        hidden ? "is-hidden" : "",
        stuck ? "is-stuck" : "",
        menuOpen ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="header-menu"
        aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="menu-toggle-bars" aria-hidden="true" />
      </button>

      {/* A tap on any link inside the panel closes it. */}
      <div
        id="header-menu"
        className="header-inner"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        {children}
      </div>
    </header>
  );
}
