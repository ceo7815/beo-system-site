import { contentImageSrcSet } from "@/lib/content-images";

const fillStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  color: "transparent",
} as const;

export function ContentImage({
  src,
  alt,
  sizes,
  width,
  height,
  className,
  priority = false,
  fill = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export ships pre-sized files; next/image is unoptimized and does not emit srcset
    <img
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      sizes={sizes}
      srcSet={contentImageSrcSet(src)}
      src={src}
      style={fill ? fillStyle : { color: "transparent" }}
    />
  );
}
