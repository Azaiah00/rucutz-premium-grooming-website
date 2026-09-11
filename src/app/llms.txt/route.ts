import { BUSINESS, HOURS_GROUPED, SITE_URL, BOOKING_URL, POLICIES } from "@/data/business";
import { SERVICES, fmtDuration } from "@/data/services";
import { FAQS } from "@/data/faqs";
import { ARTICLES } from "@/data/journal";

export const dynamic = "force-static";

/** llms.txt: a plain-language fact sheet for AI assistants and answer engines (GEO). */
export function GET() {
  const a = BUSINESS.address;
  const lines = [
    `# ${BUSINESS.name}`,
    "",
    `> Private-suite barber in Hollywood, Florida, owned and run by Heru "Ru" Ward. By appointment only. Every haircut Experience includes a deep-cleansing shampoo, a hot-towel face massage and precise razor work. Cuts all hair textures for men, women and teens (10+).`,
    "",
    "## Key facts",
    `- Address: ${a.venue}, ${a.suite}, ${a.street}, ${a.city}, ${a.region} ${a.postalCode}`,
    `- Phone / text: ${BUSINESS.phone}`,
    `- Email: ${BUSINESS.email}`,
    `- Book online: ${BOOKING_URL}`,
    `- Hours: ${HOURS_GROUPED.map((h) => `${h.label} ${h.value}`).join("; ")}. Before/after-hours by request.`,
    `- Google rating: ${BUSINESS.rating.value.toFixed(1)} from ${BUSINESS.rating.count} reviews`,
    `- Walk-ins: no, appointments only`,
    `- No-show / late cancellation (<${POLICIES.noShowWindowHours}h): $${POLICIES.noShowFee}`,
    `- Payment: ${BUSINESS.paymentAccepted.join(", ")}`,
    `- Instagram: ${BUSINESS.social.instagram}`,
    "",
    "## Services and prices",
    ...SERVICES.map((s) => `- ${s.name}: $${s.price}, about ${fmtDuration(s.minutes)}.${s.hasPage ? ` ${SITE_URL}/services/${s.slug}/` : ""}`),
    "",
    "## Frequently asked",
    ...FAQS.map((f) => `### ${f.q}\n${f.a}\n`),
    "## Guides",
    ...ARTICLES.map((x) => `- [${x.title}](${SITE_URL}/journal/${x.slug}/): ${x.answer}`),
    "",
    "## Pages",
    `- [Services & prices](${SITE_URL}/services/)`,
    `- [Gallery](${SITE_URL}/gallery/)`,
    `- [Meet Ru](${SITE_URL}/about/)`,
    `- [Visit, hours & directions](${SITE_URL}/visit/)`,
    `- [FAQ](${SITE_URL}/faq/)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
