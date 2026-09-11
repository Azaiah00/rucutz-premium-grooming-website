import { MARK, ANKH } from "./brand-paths";
import { cn } from "@/lib/cn";

type Geo = { viewBox: string; transform: string; paths: readonly string[] };

/**
 * Ru's marks, vectorised from his own 3500px logo with potrace.
 * The wordmark ships as a cached SVG file rather than inline markup — it is 67 contours,
 * and inlining it three times per page cost ~90 KB of HTML.
 */

function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.35">
        <stop offset="0" stopColor="#B87008" />
        <stop offset="0.35" stopColor="#D8A848" />
        <stop offset="0.55" stopColor="#F6D77F" />
        <stop offset="0.75" stopColor="#D8A848" />
        <stop offset="1" stopColor="#9A620C" />
      </linearGradient>
    </defs>
  );
}

function Shape({ g, id, title, className, fill }: { g: Geo; id: string; title?: string; className?: string; fill?: string }) {
  return (
    <svg
      viewBox={g.viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {!fill && <GoldDefs id={id} />}
      <g transform={g.transform}>
        {g.paths.map((d, i) => (
          <path key={i} d={d} fill={fill ?? `url(#${id})`} />
        ))}
      </g>
    </svg>
  );
}

/** Ru's full wordmark: scissors + "Rucutz" + clipper + PREMIUM GROOMING. */
export function Logo({ className, draw, title = "RuCutz Premium Grooming", priority }: { className?: string; draw?: boolean; title?: string; priority?: boolean }) {
  // The hero version stroke-draws itself; the animation lives inside the SVG file, so it
  // needs no JS and still respects prefers-reduced-motion.
  const src = draw ? "/brand/rucutz-logo-draw.svg" : "/brand/rucutz-logo.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title}
      width={2702}
      height={1127}
      className={cn("block h-auto w-full", className)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

export function ScissorsMark({ className, id = "sm", fill }: { className?: string; id?: string; fill?: string }) {
  return <Shape g={MARK} id={id} className={className} fill={fill} />;
}

/** The ankh that forms the "t" in Ru's wordmark. The site's ornament. */
export function Ankh({ className, id = "ak", fill }: { className?: string; id?: string; fill?: string }) {
  return <Shape g={ANKH} id={id} className={className} fill={fill} />;
}

/** Cached file version, for places that repeat the ornament many times (the marquee). */
export function AnkhImg({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/rucutz-ankh.svg" alt="" aria-hidden width={224} height={571} className={cn("block w-auto", className)} loading="lazy" decoding="async" />
  );
}
