import { logoSrcSet } from "@/lib/logo-mark";

export function LogoMark({
  alt,
  sizes,
  width,
  height,
  className,
  priority = false,
}: {
  alt: string;
  sizes: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={logoSrcSet()} sizes={sizes} />
      <img
        src="/brand/logo-mark.png"
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
