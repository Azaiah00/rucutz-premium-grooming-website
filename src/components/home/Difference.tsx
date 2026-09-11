import { Check, X } from "lucide-react";
import { SectionHead } from "../SectionHead";

const ROWS = [
  { them: "A waiting room and a sign-in sheet", us: "Your time is reserved. No waiting room, no line." },
  { them: "Dry cut straight out of the chair", us: "Deep-cleansing shampoo before every cut, non-negotiable." },
  { them: "Rushed so the next head can sit", us: "30 to 80 unhurried minutes, depending on your Experience." },
  { them: "A crowded, noisy floor", us: "A private suite inside Salon Lofts Hollywood." },
  { them: "Line-up and out the door", us: "Razor detail, then a deep-tissue hot-towel face massage." },
  { them: "Whoever's chair is free", us: "Ru, every time. Same hands, same standard." },
];

export function Difference() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="diff-title">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              tag="the difference"
              id="diff-title"
              title={
                <>
                  The rush cut <span className="foil-text">ends here.</span>
                </>
              }
              intro={
                <>
                  <p>
                    You know the routine: sign in, wait, get rushed through a dry cut, pay, leave. It gets the job done. It doesn&apos;t make you feel like
                    anything.
                  </p>
                  <p className="mt-4 text-bone">
                    RuCutz was built the other way around. One chair, your name on the hour, and a process that treats a haircut like the statement it is.
                  </p>
                </>
              }
            />
          </div>

          <div className="reveal overflow-hidden rounded-[3px] border border-line">
            <div className="hidden grid-cols-2 border-b border-line bg-ink-3 text-sm sm:grid">
              <p className="eyebrow px-5 py-4 text-bone-mute md:px-7">The usual shop</p>
              <p className="eyebrow border-l border-line px-5 py-4 text-gold md:px-7">The RuCutz Experience</p>
            </div>
            <ul>
              {ROWS.map((r) => (
                <li key={r.us} className="border-b border-line/70 last:border-0 sm:grid sm:grid-cols-2">
                  <p className="flex gap-3 px-5 pt-5 text-sm text-bone-mute sm:py-5 sm:text-base md:px-7">
                    <X className="mt-1 h-4 w-4 shrink-0 text-bone-mute/70" aria-hidden />
                    <span className="line-through decoration-bone-mute/40">{r.them}</span>
                  </p>
                  <p className="flex gap-3 px-5 pb-5 pt-2 text-bone sm:border-l sm:border-line sm:bg-ink-2/60 sm:py-5 md:px-7">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                    <span>{r.us}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
