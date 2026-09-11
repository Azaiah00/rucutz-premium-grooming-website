import { BUSINESS, POLICIES } from "./business";

/** Answer-first FAQ copy: every answer opens with the direct answer and names the business,
 * so search engines and AI assistants can quote it on its own. */
export type Faq = { q: string; a: string; group: "Booking" | "Services" | "The Suite" };

export const FAQS: Faq[] = [
  {
    group: "The Suite",
    q: "Where is RuCutz Premium Grooming located?",
    a: `RuCutz Premium Grooming is inside Salon Lofts Hollywood, ${BUSINESS.address.suite}, at ${BUSINESS.address.street}, Hollywood, FL ${BUSINESS.address.postalCode}. The building is on the north side of Sheridan Street just west of N 46th Avenue, next to LongHorn Steakhouse, between I-95 (Exit 21, Sheridan St) and US 441.`,
  },
  {
    group: "Booking",
    q: "Does RuCutz take walk-ins?",
    a: "No. RuCutz Premium Grooming is by appointment only, so your time in the chair is reserved for you and you never sit in a waiting room. Book online 24/7 through Ru's Square booking page, or call or text (757) 434-6004.",
  },
  {
    group: "Services",
    q: "How much is a haircut at RuCutz?",
    a: "A King Haircut Experience at RuCutz Premium Grooming is $60 (about 45 minutes). Teens 10–17 are $50 with the Prince Haircut Experience, the Ultimate Edge Up is $50, and the full Distinguished Experience is $120. Every cut includes a deep-cleansing shampoo and a hot-towel face massage.",
  },
  {
    group: "Services",
    q: "What is included with every RuCutz cut?",
    a: "Every RuCutz haircut Experience includes a deep-cleansing shampoo before the cut, a deep-tissue hot-towel face massage, and precise razor work on the hairline and facial hair (the Queen Haircut includes the shampoo and hot towel). Ru calls the shampoo non-negotiable: cutting clean hair makes the cut sharper and last longer.",
  },
  {
    group: "Services",
    q: "Does Ru cut all hair types?",
    a: "Yes. Ru specializes in all textures: 360 waves, tight coils, curls, afros, locs and straight hair, on men, women and teens. The gallery on this site shows real cuts on every one of those textures.",
  },
  {
    group: "Services",
    q: "Can RuCutz cut off my locs or do a big chop?",
    a: "Yes. The Big Chops / Major Transformations Experience ($100, about 75 minutes) is built for cutting off locs, long afros or matted hair. It includes a wash and conditioning, detangling, a hot-towel massage and razor work. Locs-to-waves transformations show up on Ru's feed again and again.",
  },
  {
    group: "Services",
    q: "Does RuCutz cut kids' and women's hair?",
    a: "Yes. The Prince Haircut Experience ($50) is for ages 10–17 and includes a complimentary design if he wants one. The Queen Haircut Experience ($60) is for women's short cuts, tapers and shape-ups. For children under 10, call or text Ru first.",
  },
  {
    group: "Booking",
    q: "What is the RuCutz cancellation and no-show policy?",
    a: `Cancel or reschedule at least ${POLICIES.noShowWindowHours} hours before your appointment. Missed appointments and cancellations inside ${POLICIES.noShowWindowHours} hours may be charged a $${POLICIES.noShowFee} no-show fee through the card on file with Square.`,
  },
  {
    group: "Booking",
    q: "What are RuCutz Premium Grooming's hours?",
    a: "RuCutz Premium Grooming is open Monday to Wednesday 12 PM – 6 PM, Thursday and Friday 10 AM – 7 PM, and Saturday 10 AM – 4 PM. Closed Sunday. Before- and after-hours appointments are available by request.",
  },
  {
    group: "Booking",
    q: "Can I book an appointment before or after regular hours?",
    a: `Yes, by request. ${POLICIES.afterHoursNote} The Before / After Hours service is $100.`,
  },
  {
    group: "Booking",
    q: "How do I pay at RuCutz?",
    a: "RuCutz Premium Grooming takes Visa, Mastercard, American Express and Discover, plus Apple Pay, Google Pay and Cash App, all through Square.",
  },
  {
    group: "The Suite",
    q: "Is there parking?",
    a: "Yes. Park in the shared lot at 4921 Sheridan Street. Salon Lofts Hollywood is on the ground floor; Ru's suite is Loft 13.",
  },
  {
    group: "The Suite",
    q: "What products does Ru use?",
    a: "Ru uses Influance Hair Care (including the Rosemary Carbon Shampoo for deep-cleansing buildup), L3VEL3 styling powder and Nairobi Professional hair care. Scents for the Signature Scent finish include extrait-de-parfum from the house of EK Lemeilleur.",
  },
  {
    group: "Services",
    q: "How often should I get my haircut?",
    a: "Most fades and tapers look their sharpest when you come back every two to three weeks; low cuts, waves and beards can often go three to four. Ru will tell you the right rhythm for your cut, and booking your next visit before you leave is the easiest way to keep it.",
  },
];

export const HOME_FAQS = FAQS.filter((f) =>
  [
    "Does RuCutz take walk-ins?",
    "How much is a haircut at RuCutz?",
    "What is included with every RuCutz cut?",
    "Does Ru cut all hair types?",
    "Can RuCutz cut off my locs or do a big chop?",
    "Where is RuCutz Premium Grooming located?",
  ].includes(f.q),
);
