import { Quote } from "lucide-react";
import { Stars } from "./Stars";
import { REVIEWS, type Review } from "@/data/reviews";
import { BUSINESS } from "@/data/business";

function Card({ r }: { r: Review }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col justify-between rounded-[3px] border border-line bg-ink-3/80 p-6 md:w-[380px]">
      <div>
        <div className="flex items-center justify-between">
          <Stars className="h-4 w-auto text-gold" />
          <Quote className="h-6 w-6 text-gold/40" aria-hidden />
        </div>
        <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-bone">&ldquo;{r.text}&rdquo;</blockquote>
      </div>
      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="font-semibold text-bone">{r.name}</span>
        <span className="text-bone-mute">{r.when}</span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const a = REVIEWS.slice(0, 5);
  const b = REVIEWS.slice(5);
  const row = (items: Review[], reverse: boolean) => (
    <div className="group relative overflow-hidden">
      <div className="marquee-track flex w-max gap-5 pr-5 group-hover:[animation-play-state:paused]" style={{ ["--marquee-dur" as string]: "70s", animationDirection: reverse ? "reverse" : "normal" }}>
        {[...items, ...items].map((r, i) => (
          <div key={i} aria-hidden={i >= items.length || undefined}>
            <Card r={r} />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 md:py-32" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="spray tag mb-5 -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden>
              the results speak
            </p>
            <h2 id="reviews-title" className="reveal display text-[clamp(2.8rem,6.5vw,5.4rem)]">
              <span className="foil-text">5.0</span> on Google.
              <br />
              Every single review.
            </h2>
          </div>
          <div className="reveal flex flex-col gap-3 sm:flex-row">
            <a href={BUSINESS.googleReviewSearchUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              Read them on Google
            </a>
            <a href={BUSINESS.googleWriteReviewUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              Leave Ru a review
            </a>
          </div>
        </div>
      </div>
      <div className="mt-14 space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {row(a, false)}
        {row(b, true)}
      </div>
      <p className="mx-auto mt-8 max-w-[1400px] px-5 text-sm text-bone-mute md:px-8">
        Verbatim from RuCutz Premium Grooming&apos;s Google Business Profile ({BUSINESS.rating.count} reviews, {BUSINESS.rating.value.toFixed(1)} average).
      </p>
    </section>
  );
}
