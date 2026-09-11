import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { OwnerDashboard } from "@/components/booking/OwnerDashboard";

export const metadata: Metadata = {
  title: "Owner Dashboard Preview",
  description: "Preview of the RuCutz owner dashboard: today's chair, rebook radar and client photo journeys.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/portal/" },
};

export default function PortalPage() {
  return (
    <section className="grain min-h-screen pb-24 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="mb-10 flex gap-3 rounded-[3px] border border-dashed border-gold/60 bg-gold/5 p-5 text-bone">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
          <span>
            <span className="font-semibold">Owner-side preview with sample data.</span> Names, times and totals are illustrative, not real clients.
          </span>
        </p>
        <p className="tag mb-4 -rotate-2 text-2xl text-gold" aria-hidden>
          ru&apos;s dashboard
        </p>
        <h1 className="display text-[clamp(3rem,7vw,5.5rem)]">
          The chair, <span className="foil-text">at a glance.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-bone-dim">
          What a standard booking app won&apos;t show you in one place: who&apos;s in the chair, who&apos;s overdue for a cut, and every client&apos;s photo journey.
        </p>
        <div className="mt-12">
          <OwnerDashboard />
        </div>
        <p className="mt-16 text-sm text-bone-mute">
          Client side: <Link href="/book/" className="inline-block py-2 text-gold underline underline-offset-4">try the booking flow</Link>.
        </p>
      </div>
    </section>
  );
}
