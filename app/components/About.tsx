import ActionButton from "./ActionButton";
import ScrollHighlight from "./ScrollHighlight";

export default function About() {
  return (
    <section className="about">
      <div className="about-inner">
        <p className="about-kicker">
          <span className="about-kicker-dot" aria-hidden="true" />
          Tentang kami
        </p>

        <div className="about-body">
          <ScrollHighlight
            className="about-text"
            text="Di RUWAA Residence, kami membantu individu yang berhadapan dengan ketagihan dadah dan masalah sosial untuk membina semula kehidupan melalui program pemulihan yang tersusun, persekitaran yang kondusif dan bimbingan yang menyeluruh."
          />

          <ActionButton href="/perihal" variant="cream">
            Ketahui Lebih Lanjut
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
