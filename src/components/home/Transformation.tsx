import Link from "next/link";
import { BeforeAfter } from "../BeforeAfter";
import { BookLink } from "../BookLink";

export function Transformation() {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 md:py-32" aria-labelledby="tx-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal order-2 lg:order-1">
          <BeforeAfter before="bigchop-before" after="bigchop-after" beforeLabel="Locs" afterLabel="Waves" />
          <p className="mt-3 text-sm text-bone-mute">A big chop from Ru&apos;s own feed. Drag the handle, or use your arrow keys.</p>
        </div>
        <div className="order-1 lg:order-2">
          <p className="spray tag mb-5 -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden>
            locs to waves
          </p>
          <h2 id="tx-title" className="reveal display text-[clamp(2.8rem,6.5vw,5.4rem)]">
            Not a haircut. <span className="foil-text">A rebirth.</span>
          </h2>
          <p className="reveal mt-6 max-w-xl text-lg text-bone-dim">
            Cutting off years of locs or a long afro isn&apos;t a regular appointment, so it isn&apos;t booked like one. The Big Chop Experience gives Ru 75
            minutes to wash, condition and detangle before the first cut, then shape your new look with razor detail and a hot towel to finish.
          </p>
          <ul className="reveal mt-8 grid gap-3 text-bone sm:grid-cols-2">
            {["Wash + conditioning", "Full detangle", "The chop & new shape", "Razor work + hot towel"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
            <BookLink label="Book the Big Chop Experience">Book the Big Chop · $100</BookLink>
            <Link href="/journal/big-chop-locs-to-waves/" className="btn btn-ghost">
              What to expect
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
