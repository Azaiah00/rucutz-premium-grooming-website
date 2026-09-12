import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Info, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceMedia, MenuRow } from "@/components/ServiceBits";
import { BookLink } from "@/components/BookLink";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PAGE_SERVICES, serviceBySlug, ADDONS, fmtDuration, withThe } from "@/data/services";
import { REVIEWS } from "@/data/reviews";
import { FAQS } from "@/data/faqs";
import { BUSINESS } from "@/data/business";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { photo, largest } from "@/lib/photos";

/** Meta descriptions get cut at a word boundary so Google never shows a chopped word. */
const clamp = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…");

export function generateStaticParams() {
  return PAGE_SERVICES.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.short} · $${s.price} · Hollywood FL`,
    description: clamp(`${s.tagline} $${s.price}, about ${fmtDuration(s.minutes)}, at RuCutz Premium Grooming in Hollywood, FL. ${s.summary}`, 168),
    path: `/services/${s.slug}/`,
    image: s.photo ? largest(photo(s.photo)) : undefined,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s || !s.hasPage) notFound();

  const faqs = [
    ...(s.faq ?? []),
    ...FAQS.filter((f) => ["What is the RuCutz cancellation and no-show policy?", "Does RuCutz take walk-ins?", "Where is RuCutz Premium Grooming located?"].includes(f.q)),
  ];
  const related = PAGE_SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);
  const quotes = REVIEWS.slice(0, 3);

  return (
    <>
      <JsonLd data={[serviceSchema(s), faqSchema(faqs)]} />
      <PageHero
        tag={s.tagline.toLowerCase()}
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: s.short, path: `/services/${s.slug}/` },
        ]}
        title={s.name}
        intro={<p>{s.summary}</p>}
      >
        <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "320ms" }}>
          <BookLink label={`Book ${withThe(s.name)}`}>Book this Experience</BookLink>
          <p className="flex items-center gap-5 text-bone">
            <span className="display text-4xl text-gold">${s.price}</span>
            <span className="flex items-center gap-2 text-bone-dim">
              <Clock className="h-4 w-4 text-gold" aria-hidden /> About {fmtDuration(s.minutes)}
            </span>
          </p>
        </div>
      </PageHero>

      <section className="pb-24" aria-labelledby="incl-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <ServiceMedia s={s} className="aspect-[4/5] rounded-[3px] border border-line" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="lg:py-6">
            <h2 id="incl-title" className="reveal display text-[clamp(2.4rem,5vw,3.8rem)]">
              What&apos;s <span className="foil-text">included</span>
            </h2>
            <ol className="mt-8 space-y-5">
              {s.includes.map((item, i) => (
                <li key={item} className="reveal flex gap-5 border-b border-line pb-5" style={{ ["--d" as string]: `${i * 70}ms` }}>
                  <span className="display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-bone">{item}</span>
                </li>
              ))}
            </ol>
            {s.note && (
              <p className="reveal mt-8 flex gap-3 rounded-[3px] border border-gold/40 bg-gold/5 p-5 text-bone">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                {s.note}
              </p>
            )}
            <div className="reveal mt-10">
              <h3 className="eyebrow text-bone-mute">Best for</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.bestFor.map((b) => (
                  <li key={b} className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-bone">
                    <Check className="h-3.5 w-3.5 text-gold" aria-hidden /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal mt-10 rounded-[3px] border border-line bg-ink-2 p-6">
              <h3 className="eyebrow text-gold">Make it yours</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {ADDONS.map((a) => (
                  <li key={a.slug} className="flex justify-between gap-3 text-bone-dim">
                    <span>{a.name}</span>
                    <span className="text-bone">+${a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2 py-20" aria-labelledby="proof-title">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 id="proof-title" className="reveal display text-[clamp(2.2rem,4.5vw,3.4rem)]">
            What clients say about <span className="foil-text">Ru</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quotes.map((r) => (
              <figure key={r.name} className="reveal rounded-[3px] border border-line bg-ink-3/70 p-6">
                <blockquote className="text-bone">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-bone-mute">{r.name} · Google review</figcaption>
              </figure>
            ))}
          </div>
          <a href={BUSINESS.googleReviewSearchUrl} target="_blank" rel="noopener" className="eyebrow reveal mt-8 inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8">
            All {BUSINESS.rating.count} Google reviews
          </a>
        </div>
      </section>

      <section className="py-24" aria-labelledby="sfaq-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <h2 id="sfaq-title" className="reveal display text-[clamp(2.4rem,5vw,3.8rem)]">
            Before you <span className="foil-text">book</span>
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="border-t border-line py-20" aria-labelledby="more-title">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 id="more-title" className="reveal display text-[clamp(2rem,4vw,3rem)]">Other Experiences</h2>
          <div className="mt-6 grid gap-x-16 md:grid-cols-2">
            {related.map((r) => (
              <div key={r.slug} className="reveal border-b border-line">
                <MenuRow s={r} />
              </div>
            ))}
          </div>
          <Link href="/services/" className="eyebrow reveal mt-8 inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8">
            Full service menu
          </Link>
        </div>
      </section>

      <CtaBand title={`Book ${withThe(s.short)}.`} text={`$${s.price} · about ${fmtDuration(s.minutes)} · Salon Lofts Hollywood, Loft 13. Booking online is quick, simple and open 24/7.`} />
    </>
  );
}
