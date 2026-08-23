"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect on the client so words are dimmed before first paint;
// useEffect on the server pass to keep React quiet.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DIMMED = 0.18;

type Props = {
  text: string;
  className?: string;
};

export default function ScrollHighlight({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".word-inner");
    if (!words.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: DIMMED });

      // Scrubbed: the highlight tracks the scrollbar rather than playing once,
      // so words light up as the section moves through the viewport.
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 55%",
          scrub: 0.4,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        // The space sits between the spans, not inside them — a trailing space
        // inside an inline-block collapses and the words run together.
        <Fragment key={`${word}-${i}`}>
          <span className="word">
            <span className="word-inner">{word}</span>
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}
