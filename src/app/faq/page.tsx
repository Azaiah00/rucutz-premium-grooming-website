import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { BookLink } from "@/components/BookLink";
import { FAQS } from "@/data/faqs";
import { BUSINESS } from "@/data/business";
import { faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "FAQ: Prices, Walk-ins & Policies",
  description:
    "Straight answers about RuCutz in Hollywood, FL: prices, what's included, walk-ins, big chops, kids' and women's cuts, hours and the no-show policy.",
  path: "/faq/",
});

const GROUPS = ["Booking", "Services", "The Suite"] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <PageHero
        tag="real talk"
        crumbs={[{ name: "FAQ", path: "/faq/" }]}
        title={
          <>
            Questions, <span className="foil-text">answered.</span>
          </>
        }
        intro={
          <p>
            Don&apos;t see yours? Call or text Ru at{" "}
            <a href={BUSINESS.phoneHref} className="text-bone underline decoration-gold/50 underline-offset-4">
              {BUSINESS.phone}
            </a>
            .
          </p>
        }
      />
      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] space-y-16 px-5 md:px-8">
          {GROUPS.map((g) => (
            <div key={g} className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
              <h2 className="reveal display text-[clamp(2.2rem,4vw,3rem)] lg:sticky lg:top-28 lg:self-start">{g}</h2>
              <FaqList items={FAQS.filter((f) => f.group === g)} />
            </div>
          ))}
          <div className="reveal flex justify-center">
            <BookLink label="Book your experience" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
