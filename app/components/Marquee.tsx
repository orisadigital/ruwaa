const WORDS = [
  "Recovery",
  "Understanding",
  "Wellness",
  "Accountability",
  "Aspiration",
];
const REPEATS = 2;

function Group() {
  return (
    <div className="marquee-group">
      {Array.from({ length: REPEATS }, (_, r) =>
        WORDS.map((word) => (
          <span className="marquee-item" key={`${r}-${word}`}>
            {word}
            <span className="marquee-dot" aria-hidden="true" />
          </span>
        )),
      )}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee">
      {/* Read once for screen readers; the loop itself is decorative. */}
      <p className="sr-only">{WORDS.join(", ")}.</p>

      <div className="marquee-track" aria-hidden="true">
        <Group />
        <Group />
      </div>
    </section>
  );
}
