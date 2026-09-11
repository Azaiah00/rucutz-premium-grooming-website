import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { BUSINESS, POLICIES } from "@/data/business";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Booking Policies",
  description: "How booking works at RuCutz Premium Grooming: appointments only, 24-hour cancellation window, $45 no-show fee, after-hours requests and accepted payments.",
  path: "/policies/",
});

const ITEMS = [
  { t: "Appointments only", d: "RuCutz is by appointment only. Book online through Ru's Square page, or call or text to ask about availability." },
  { t: "24-hour cancellation window", d: `Need to cancel or reschedule? Do it at least ${POLICIES.noShowWindowHours} hours before your appointment.` },
  { t: `$${POLICIES.noShowFee} no-show fee`, d: `No-shows and cancellations inside ${POLICIES.noShowWindowHours} hours may be charged a $${POLICIES.noShowFee} fee to the card on file. It protects the time Ru holds for you.` },
  { t: "Before / after hours", d: POLICIES.afterHoursNote },
  { t: "Edge-ups mean edge-ups", d: "The Ultimate Edgeup Experience is a line-up only. It does not include any fading. Book a King Haircut Experience if you need the full cut." },
  { t: "Payment", d: `Accepted through Square: ${BUSINESS.paymentAccepted.join(", ")}.` },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        tag="the fine print"
        crumbs={[{ name: "Booking policies", path: "/policies/" }]}
        title={
          <>
            Respect the time. <span className="foil-text">Yours and his.</span>
          </>
        }
        intro={<p>A few simple rules keep the book running on time for everyone.</p>}
      />
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <dl className="divide-y divide-line border-y border-line">
            {ITEMS.map((i) => (
              <div key={i.t} className="reveal grid gap-2 py-7 md:grid-cols-[260px_1fr] md:gap-10">
                <dt className="display text-2xl text-bone">{i.t}</dt>
                <dd className="text-bone-dim">{i.d}</dd>
              </div>
            ))}
          </dl>
          <p className="reveal mt-8 text-sm text-bone-mute">Policies mirror Ru&apos;s Square booking settings as of September 2026.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
