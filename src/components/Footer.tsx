import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo, Ankh } from "./Brand";
import { BookLink } from "./BookLink";
import { InstagramIcon, FacebookIcon, XIcon } from "./SocialIcons";
import { BUSINESS, HOURS_GROUPED } from "@/data/business";
import { PAGE_SERVICES } from "@/data/services";

export function Footer() {
  const a = BUSINESS.address;
  return (
    <footer className="grain relative border-t border-line bg-ink-2 pb-28 pt-20 lg:pb-12">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <Logo className="w-[220px]" />
            <p className="max-w-sm text-bone-dim">
              Private-suite barbering in Hollywood, FL. One barber, one client, by appointment only. Built on precision and consistency.
            </p>
            <div className="flex gap-3">
              {[
                { href: BUSINESS.social.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: BUSINESS.social.facebook, label: "Facebook", Icon: FacebookIcon },
                { href: BUSINESS.social.x, label: "X (Twitter)", Icon: XIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`RuCutz on ${label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-bone-dim transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow mb-5 text-gold">Visit</h2>
            <address className="space-y-3 not-italic text-bone-dim">
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className="flex gap-3 py-1.5 hover:text-bone">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {a.venue}, {a.suite}
                  <br />
                  {a.street}
                  <br />
                  {a.city}, {a.region} {a.postalCode}
                </span>
              </a>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-3 py-2 hover:text-bone">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 break-all py-2 hover:text-bone">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                {BUSINESS.email}
              </a>
            </address>
          </div>

          <div>
            <h2 className="eyebrow mb-5 text-gold">Hours</h2>
            <dl className="space-y-2 text-bone-dim">
              {HOURS_GROUPED.map((h) => (
                <div key={h.label} className="flex justify-between gap-4 border-b border-line/60 pb-2">
                  <dt>{h.label}</dt>
                  <dd className="text-bone">{h.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-bone-mute">By appointment only. Before / after hours on request.</p>
          </div>

          <div>
            <h2 className="eyebrow mb-5 text-gold">Experiences</h2>
            <ul className="space-y-2 text-bone-dim">
              {PAGE_SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="inline-block py-1.5 hover:text-bone">
                    {s.short}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/" className="inline-block py-1.5 text-gold hover:text-gold-lift">
                  Full service menu
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-sm border border-line bg-ink-3/60 p-6 md:flex-row md:items-center md:p-8">
          <div className="flex items-center gap-4">
            <Ankh id="ftr-ankh" className="h-10 w-auto shrink-0" />
            <p className="display text-3xl md:text-4xl">
              Precision. Detail. <span className="foil-text">Presence.</span>
            </p>
          </div>
          <BookLink label="Book your experience" />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-bone-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. Hollywood, Florida.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><Link href="/journal/" className="inline-block px-1 py-2 hover:text-bone">Journal</Link></li>
              <li><Link href="/policies/" className="inline-block px-1 py-2 hover:text-bone">Booking policies</Link></li>
              <li><Link href="/faq/" className="inline-block px-1 py-2 hover:text-bone">FAQ</Link></li>
              <li><Link href="/book/" className="inline-block px-1 py-2 hover:text-bone">Booking portal (preview)</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
