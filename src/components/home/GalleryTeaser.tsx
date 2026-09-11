import Link from "next/link";
import { Img } from "../Img";
import { InstagramIcon } from "../SocialIcons";
import { BUSINESS } from "@/data/business";
import { cn } from "@/lib/cn";

// 1 feature tile + 8 singles = a full 4×3 grid on desktop and 2×6 on phones.
const PICKS = [
  { k: "g01", c: "col-span-2 row-span-2" },
  { k: "g28", c: "" },
  { k: "g19", c: "" },
  { k: "g43", c: "" },
  { k: "g33", c: "" },
  { k: "svc-afterhours", c: "" },
  { k: "g51", c: "" },
  { k: "svc-prince", c: "" },
  { k: "g37", c: "" },
];

export function GalleryTeaser() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="gal-title">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="spray tag mb-5 -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden>
              fresh off the chair
            </p>
            <h2 id="gal-title" className="reveal display text-[clamp(2.8rem,6.5vw,5.4rem)]">
              Every texture. <span className="foil-text">Same standard.</span>
            </h2>
            <p className="reveal mt-6 max-w-xl text-lg text-bone-dim">
              Waves, coils, curls, straight hair, locs and beards. Real clients, real cuts, straight from Ru&apos;s chair in Hollywood.
            </p>
          </div>
          <div className="reveal flex flex-col gap-3 sm:flex-row">
            <Link href="/gallery/" className="btn btn-ghost">
              View the full gallery
            </Link>
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
              <InstagramIcon className="h-4 w-4" /> {BUSINESS.social.instagramHandle}
            </a>
          </div>
        </div>
        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {PICKS.map((p, i) => (
            <Link
              key={p.k}
              href="/gallery/"
              className={cn("reveal group relative overflow-hidden rounded-[3px] border border-line bg-ink-3", p.c)}
              style={{ ["--d" as string]: `${(i % 4) * 80}ms` }}
            >
              <Img k={p.k} sizes="(min-width: 768px) 25vw, 50vw" className="transition-transform duration-[1.2s] ease-[var(--ease-cut)] group-hover:scale-105" />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
