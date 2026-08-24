import ActionButton from "./components/ActionButton";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Gallery from "./components/Gallery";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Pillars from "./components/Pillars";
import PinnedImage from "./components/PinnedImage";
import Values from "./components/Values";

export default function Home() {
  return (
    <main>
      <section className="hero">
        {/* Two 24fps sources. The original was 24fps content padded to 30fps by
            duplicating every fifth frame, which made the motion judder. The browser
            picks a source once, at load; it is not re-picked on resize. */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.jpg"
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/hero-mobile.mp4" media="(max-width: 900px)" type="video/mp4" />
          <source src="/video/hero-1280.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            RUWAA Residence
            <span className="hero-kicker-dot" aria-hidden="true" />
          </p>
          <h1 className="hero-title">
            Bangkit Semula.
            <br />
            Bina Semula.
          </h1>
          <p className="hero-subtitle">Hidup Lebih Bermakna</p>
          <div className="hero-actions">
            <ActionButton href="/daftar">Daftar Sekarang</ActionButton>
            <ActionButton href="/rehab" variant="ghost">
              Ketahui Lebih Lanjut
            </ActionButton>
          </div>
        </div>

        <a href="#seterusnya" className="scroll-cue" aria-label="Skrol ke bawah">
          <svg
            className="scroll-cue-ring"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              <path
                id="scroll-cue-path"
                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                fill="none"
              />
            </defs>
            <text>
              <textPath href="#scroll-cue-path" startOffset="0">
                Skrol ke bawah • Skrol ke bawah •&nbsp;
              </textPath>
            </text>
          </svg>
          <span className="scroll-cue-arrow" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </span>
        </a>
      </section>

      <Marquee />
      <Pillars />
      <About />

      <PinnedImage
        src="/image/surau.png"
        alt="Surau di RUWAA Residence"
        width={1672}
        height={941}
      />

      <Values />
      <Gallery />
      <Faq />
      <Contact />
    </main>
  );
}
