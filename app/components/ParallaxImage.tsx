"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// How much taller the image is than its window, as a fraction. Half of this is
// the travel available in each direction.
const OVERSCAN = 0.24;

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let visible = true;

    const update = () => {
      ticking = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;

      // -1 when the frame is just below the fold, +1 when it has just left the
      // top; 0 when its centre lines up with the centre of the viewport.
      const progress =
        (viewport / 2 - (rect.top + rect.height / 2)) /
        ((viewport + rect.height) / 2);

      const travel = (rect.height * OVERSCAN) / 2;
      const offset = Math.max(-1, Math.min(1, progress)) * travel;
      image.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking || !visible) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { rootMargin: "100px" },
    );
    io.observe(frame);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={frameRef} className={`parallax ${className ?? ""}`.trim()}>
      <Image
        ref={imageRef}
        className="parallax-image"
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        quality={90}
      />
    </div>
  );
}
