import Image from "next/image";

export default function Gallery() {
  return (
    <section className="gallery">
      <Image
        className="gallery-left"
        src="/image/1.png"
        alt=""
        width={1078}
        height={1170}
        sizes="(max-width: 900px) 60vw, 24vw"
        quality={90}
      />
      <Image
        className="gallery-right"
        src="/image/2.png"
        alt=""
        width={1148}
        height={1240}
        sizes="(max-width: 900px) 80vw, 40vw"
        quality={90}
      />
    </section>
  );
}
