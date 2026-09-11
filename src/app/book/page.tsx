import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { Booker } from "@/components/booking/Booker";
import { BookLink } from "@/components/BookLink";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Booking Portal Preview",
    description: "A preview of the custom RuCutz booking experience. To book a real appointment, use Ru's live Square booking page.",
    path: "/book/",
  }),
  robots: { index: false, follow: true },
};

export default function BookPage() {
  return (
    <section className="grain min-h-screen pb-24 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 rounded-[3px] border border-dashed border-gold/60 bg-gold/5 p-5 md:flex-row md:items-center md:justify-between">
          <p className="flex gap-3 text-bone">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
            <span>
              <span className="font-semibold">Preview of the custom RuCutz booking portal.</span> Nothing you do here books a real appointment.
            </span>
          </p>
          <BookLink className="shrink-0" label="Book a real appointment on Square">Book for real</BookLink>
        </div>
        <p className="tag mb-4 -rotate-2 text-2xl text-gold" aria-hidden>
          lock in
        </p>
        <h1 className="display text-[clamp(3rem,7vw,5.5rem)]">
          Book your <span className="foil-text">experience.</span>
        </h1>
        <p className="mt-4 max-w-xl text-bone-dim">Five steps, a live total, and only the times that actually fit your service.</p>
        <div className="mt-12">
          <Booker />
        </div>
        <p className="mt-16 text-sm text-bone-mute">
          Owner side of the portal: <Link href="/portal/" className="inline-block py-2 text-gold underline underline-offset-4">see Ru&apos;s dashboard preview</Link>.
        </p>
      </div>
    </section>
  );
}
