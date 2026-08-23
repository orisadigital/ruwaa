import ActionButton from "./ActionButton";
import ParallaxImage from "./ParallaxImage";

export default function About() {
  return (
    <section className="about">
      <div className="about-inner">
        <p className="about-kicker">
          <span className="about-kicker-dot" aria-hidden="true" />
          Tentang kami
        </p>

        <div className="about-body">
          <p className="about-text">
            Di RUWAA Residence, kami membantu individu yang berhadapan dengan
            ketagihan dadah dan masalah sosial untuk membina semula kehidupan
            melalui program pemulihan yang tersusun, persekitaran yang kondusif
            dan bimbingan yang menyeluruh.
          </p>

          <ActionButton href="/perihal" variant="cream">
            Ketahui Lebih Lanjut
          </ActionButton>
        </div>
      </div>

      <ParallaxImage
        className="about-parallax"
        src="/image/surau.png"
        alt="Surau di RUWAA Residence"
        width={1672}
        height={941}
      />
    </section>
  );
}
