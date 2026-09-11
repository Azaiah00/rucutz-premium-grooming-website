import { photo as getPhoto, srcSet, largest } from "@/lib/photos";
import { cn } from "@/lib/cn";

type Props = {
  k: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  alt?: string;
  style?: React.CSSProperties;
  /** Only load at this media query (e.g. "(min-width: 1024px)"); elsewhere a 1px blank is used. */
  media?: string;
};

const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Responsive, CLS-safe <img> for pre-generated WebP renditions. */
export function Img({ k, sizes = "(min-width: 1024px) 50vw, 100vw", className, priority, alt, style, media }: Props) {
  const p = getPhoto(k);
  if (media) {
    return (
      <picture className="contents">
        <source media={media} srcSet={srcSet(p)} sizes={sizes} />
        { }
        <img
          src={BLANK}
          width={p.w}
          height={p.h}
          alt={alt ?? p.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={cn("block h-full w-full object-cover", className)}
          style={style}
        />
      </picture>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={largest(p)}
      srcSet={srcSet(p)}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("block h-full w-full object-cover", className)}
      style={style}
    />
  );
}
