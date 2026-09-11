import { Img } from "./Img";
import { BookLink } from "./BookLink";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";

export function CtaBand({ title = "Your chair is waiting.", text = "Advance scheduling is recommended: prime slots go first. Booking online is quick, simple and open 24/7." }: { title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-40" aria-labelledby="cta-title">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Img k="svc-afterhours" sizes="100vw" alt="" className="object-[50%_35%] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink" />
      </div>
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="spray tag -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden>
          lock in your experience
        </p>
        <h2 id="cta-title" className="reveal display mt-3 text-[clamp(3.2rem,9vw,7.5rem)]">
          {title}
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-bone-dim">{text}</p>
        <div className="reveal mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <BookLink label="Book your experience" />
          <a href={BUSINESS.phoneHref} className="btn btn-ghost">
            <Phone className="h-4 w-4" aria-hidden /> {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
