import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VisitBlock } from "@/components/VisitBlock";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/data/faqs";
import { BUSINESS } from "@/data/business";
import { faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Visit: Hours, Parking & Directions (Hollywood, FL)",
  description:
    "RuCutz Premium Grooming is in Salon Lofts Hollywood, Loft 13, 4921 Sheridan St, Hollywood, FL 33021. Hours, parking and directions from I-95 and US 441.",
  path: "/visit/",
});

const ROUTES = [
  { from: "From I-95", how: "Take Exit 21 (Sheridan St) and head west. Pass N 46th Ave; the building is just ahead on your right, next to LongHorn Steakhouse." },
  { from: "From US 441 / State Road 7", how: "Head east on Sheridan St. The building is on your left just before N 46th Ave." },
  { from: "Once you're here", how: "Park in the shared lot. Salon Lofts Hollywood is on the ground floor; Ru's suite is Loft 13." },
];

export default function VisitPage() {
  const faqs = FAQS.filter((f) => f.group === "The Suite" || f.q.includes("hours") || f.q.includes("walk-ins"));
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        tag="pull up"
        crumbs={[{ name: "Visit", path: "/visit/" }]}
        title={
          <>
            Salon Lofts Hollywood, <span className="foil-text">Loft 13.</span>
          </>
        }
        intro={<p>{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}. By appointment only, six days a week.</p>}
      />
      <section className="pb-24" aria-label="Location and hours">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <VisitBlock />
        </div>
      </section>

      <section className="bg-ink-2 py-24" aria-labelledby="routes-title">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 id="routes-title" className="reveal display text-[clamp(2.4rem,5vw,3.8rem)]">
            Getting <span className="foil-text">here</span>
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {ROUTES.map((r, i) => (
              <li key={r.from} className="reveal rounded-[3px] border border-line bg-ink-3/70 p-7" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <p className="display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-3 text-2xl">{r.from}</h3>
                <p className="mt-3 text-bone-dim">{r.how}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-14">
            <h3 className="eyebrow text-bone-mute">Clients come in from</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {BUSINESS.serviceArea.map((c) => (
                <li key={c} className="rounded-full border border-line px-4 py-2 text-sm text-bone">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="vfaq-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <h2 id="vfaq-title" className="reveal display text-[clamp(2.4rem,5vw,3.8rem)]">
            Good to <span className="foil-text">know</span>
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
