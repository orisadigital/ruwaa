import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

// No JS: the block sticks to the viewport while the sections after it — which
// sit on a higher layer — scroll up over the top of it.
export default function PinnedImage({
  src,
  alt,
  width,
  height,
  className,
}: Props) {
  return (
    <div className={`pinned ${className ?? ""}`.trim()}>
      <Image
        className="pinned-image"
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
