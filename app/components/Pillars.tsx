"use client";

import Image from "next/image";
import type { MouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

function CarouselArrow() {
  return (
    <span className="carousel-arrow" aria-hidden="true">
      <span className="carousel-arrow-track">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </span>
    </span>
  );
}

// Pixels per second — a slow, continuous drift rather than card-by-card jumps.
const AUTOPLAY_SPEED = 55;

const PILLARS = [
  {
    title: "Fizikal",
    text: "Kesihatan & kecergasan",
    icon: (
      <Image
        className="pillar-image"
        src="/image/fizikal.jpg"
        alt=""
        width={480}
        height={480}
        sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 20vw"
        quality={90}
      />
    ),
  },
  {
    title: "Mental",
    text: "Pemikiran positif & kestabilan emosi",
    icon: (
      <Image
        className="pillar-image"
        src="/image/mental.jpg"
        alt=""
        width={480}
        height={480}
        sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 20vw"
        quality={90}
      />
    ),
  },
  {
    title: "Emosi",
    text: "Pengurusan emosi & keyakinan diri",
    icon: (
      <Image
        className="pillar-image"
        src="/image/emosi.jpg"
        alt=""
        width={480}
        height={480}
        sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 20vw"
        quality={90}
      />
    ),
  },
  {
    title: "Sosial",
    text: "Kemahiran komunikasi & interaksi sihat",
    icon: (
      <Image
        className="pillar-image"
        src="/image/sosial.png"
        alt=""
        width={480}
        height={480}
        sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 20vw"
        quality={90}
      />
    ),
  },
  {
    title: "Spiritual",
    text: "Penguatan iman & nilai diri",
    icon: (
      <Image
        className="pillar-image"
        src="/image/spiritual.png"
        alt=""
        width={480}
        height={480}
        sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 20vw"
        quality={90}
      />
    ),
  },
];

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const paused = useRef(false);
  const [dragging, setDragging] = useState(false);

  // Three copies of the list sit in the track; the viewport lives in the middle
  // one and is silently teleported back whenever it drifts into a neighbour,
  // so the run of cards never ends in either direction.
  // Distance between a card and its twin in the next copy — measured from the
  // DOM so gap changes can't put it out of step (scrollWidth / 3 is short by
  // one gap and would drift a few pixels on every wrap).
  const setWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll<HTMLElement>(".pillar");
    if (cards.length < PILLARS.length + 1) return 0;
    return cards[PILLARS.length].offsetLeft - cards[0].offsetLeft;
  };

  const recentre = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const width = setWidth();
    if (width <= 0) return;
    if (el.scrollLeft < width * 0.5) {
      el.scrollLeft += width;
    } else if (el.scrollLeft > width * 1.5) {
      el.scrollLeft -= width;
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".pillar");
    el.scrollLeft =
      cards.length > PILLARS.length
        ? cards[PILLARS.length].offsetLeft - cards[0].offsetLeft
        : 0;
    window.addEventListener("resize", recentre);
    return () => window.removeEventListener("resize", recentre);
  }, [recentre]);

  const onPointerDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
    setDragging(true);
    paused.current = true;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    paused.current = false;
    recentre();
  };

  // A drag that moved shouldn't also fire a click on the card underneath.
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current.moved > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      recentre();
      const card = el.querySelector<HTMLElement>(".pillar");
      const step = card ? card.offsetWidth + 24 : el.clientWidth;
      el.scrollBy({ left: step * direction, behavior: "smooth" });
    },
    [recentre],
  );

  // Autoplay: a continuous crawl driven frame by frame, paused while the
  // pointer is over the carousel, while dragging, while it holds focus, and
  // while the tab is hidden.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = 0;
    let pos = el.scrollLeft;

    const step = (time: number) => {
      frame = requestAnimationFrame(step);

      if (!last) {
        last = time;
        return;
      }
      const dt = Math.min((time - last) / 1000, 0.1);
      last = time;

      if (paused.current || document.hidden) {
        pos = el.scrollLeft;
        return;
      }

      pos += AUTOPLAY_SPEED * dt;
      el.scrollLeft = pos;

      // Only resync from the DOM when recentre actually teleported us; reading
      // scrollLeft back every frame would lose sub-pixel progress and stall.
      const landed = el.scrollLeft;
      recentre();
      if (Math.abs(el.scrollLeft - landed) > 1) {
        pos = el.scrollLeft;
      }
    };

    frame = requestAnimationFrame(step);

    // Native listeners rather than React props: pointerenter/leave don't bubble,
    // so this keeps pause/resume symmetrical and independent of event synthesis.
    const section = sectionRef.current;
    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      paused.current = drag.current.active;
    };

    section?.addEventListener("pointerenter", pause);
    section?.addEventListener("pointerleave", resume);
    section?.addEventListener("focusin", pause);
    section?.addEventListener("focusout", resume);

    return () => {
      cancelAnimationFrame(frame);
      section?.removeEventListener("pointerenter", pause);
      section?.removeEventListener("pointerleave", resume);
      section?.removeEventListener("focusin", pause);
      section?.removeEventListener("focusout", resume);
    };
  }, [recentre]);

  return (
    <section id="seterusnya" className="pillars" ref={sectionRef}>
      <div className="pillars-head">
        <div>
          <p className="pillars-kicker">
            <span className="pillars-kicker-dot" aria-hidden="true" />
            Pendekatan kami
          </p>
          <h2 className="pillars-title">Pemulihan menyeluruh</h2>
        </div>

        <div className="pillars-controls">
          <button
            type="button"
            className="carousel-btn carousel-btn--prev"
            onClick={() => scrollByCard(-1)}
            aria-label="Sebelumnya"
          >
            <CarouselArrow />
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollByCard(1)}
            aria-label="Seterusnya"
          >
            <CarouselArrow />
          </button>
        </div>
      </div>

      <ul
        className={dragging ? "pillars-track is-dragging" : "pillars-track"}
        ref={trackRef}
        onScroll={recentre}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {[0, 1, 2].map((copy) =>
          PILLARS.map((pillar) => (
            <li
              key={`${copy}-${pillar.title}`}
              className="pillar"
              aria-hidden={copy !== 1}
            >
              <span className="pillar-media" aria-hidden="true">
                {pillar.icon}
              </span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </li>
          )),
        )}
      </ul>
    </section>
  );
}
