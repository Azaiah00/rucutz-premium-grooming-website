/**
 * The RuCutz Journal. Written for real questions people type (and ask AI assistants)
 * before they book. Ru's own quotes are marked as quotes and come from his Instagram captions.
 * Everything else is general grooming guidance, kept conservative on purpose.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite: string }
  | { type: "cta"; text: string; service?: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle?: string; // shorter title for the <title> tag
  description: string;
  kicker: string;
  photo: string;
  published: string; // ISO
  readMinutes: number;
  answer: string; // the one-paragraph answer shown first (AEO)
  body: Block[];
};

export const ARTICLES: Article[] = [
  {
    slug: "why-every-cut-starts-at-the-shampoo-bowl",
    title: "Why Every RuCutz Cut Starts at the Shampoo Bowl",
    metaTitle: "Why Every Cut Starts With a Shampoo",
    description:
      "Most shops skip the wash. At RuCutz Premium Grooming in Hollywood, FL it is included in every service. Here is why a clean start makes a sharper, longer-lasting cut.",
    kicker: "The Method",
    photo: "ritual-wash",
    published: "2026-09-11",
    readMinutes: 4,
    answer:
      "Every haircut Experience at RuCutz Premium Grooming starts with a deep-cleansing shampoo because clean hair cuts cleaner. Washing removes product, sweat, oil and buildup, lets the hair sit in its natural pattern, and gives the barber a true surface to blend on, so lines come out sharper and the cut holds its shape longer.",
    body: [
      { type: "p", text: "Ask around and you will hear it: a lot of barbershops skip the wash. It takes time, it needs a bowl, and in a shop that runs on volume, every minute counts. RuCutz does not run on volume. The shampoo is built into every Experience on the menu, and Ru is blunt about it." },
      { type: "quote", text: "The shampoo process is non negotiable, intentional and included in every service.", cite: "Ru, on Instagram" },
      { type: "h2", text: "What a wash actually does for your cut" },
      { type: "ul", items: [
        "Clears out product, sweat, oil and dirt, so the clippers glide instead of dragging.",
        "Lets coils, curls and waves fall into their true pattern, so the blend follows your hair, not the product sitting on it.",
        "Exposes the real hairline and scalp, which is where razor-sharp line work starts.",
        "Resets the scalp. Buildup and flakes are gone before the cut, not brushed around during it.",
      ] },
      { type: "h2", text: "What Ru uses" },
      { type: "p", text: "For heavy buildup, including before a big chop, Ru reaches for Influance Hair Care's Rosemary Carbon Shampoo to deep-cleanse and exfoliate the scalp, and follows with a moisturizing shampoo and conditioner. Then the cut, then precise razor work on the hairline and beard, then a deep-tissue hot-towel face massage to lift away sweat, oil and grime." },
      { type: "h2", text: "Between cuts? There's a wash for that too" },
      { type: "p", text: "If you love that clean-scalp feeling and you are not due for a cut, Hairwash Therapy ($35, about 20 minutes) is a stand-alone wash for the health of your hair and scalp." },
      { type: "cta", text: "Book a King Haircut Experience: the shampoo is already included.", service: "king-haircut-experience" },
    ],
  },
  {
    slug: "big-chop-locs-to-waves",
    title: "The Big Chop: What to Expect When You Cut Off Your Locs",
    metaTitle: "The Big Chop: What to Expect",
    description:
      "Thinking about cutting off your locs or a long afro? What happens at a big-chop appointment at RuCutz in Hollywood, FL, how long it takes, and how to start waves after.",
    kicker: "Transformations",
    photo: "bigchop-after",
    published: "2026-09-11",
    readMinutes: 5,
    answer:
      "A big chop at RuCutz Premium Grooming is a 75-minute, $100 appointment built for cutting off locs, long afros or matted hair. Ru washes and conditions the hair, detangles, cuts the new shape, finishes with razor work and a hot-towel massage, and tells you exactly how to maintain the new look, including how to start training waves.",
    body: [
      { type: "p", text: "Cutting off locs you have grown for years is not a routine haircut, and it should not be booked like one. It is an emotional decision, and it deserves time, a plan and a barber who has done it many times. That is what the Big Chops / Major Transformations Experience is for." },
      { type: "h2", text: "Before you book" },
      { type: "ul", items: [
        "Know the look you want next: a low cut, a taper with a sponge top, or a short cut to grow waves. Screenshots help.",
        "Book the right service. A regular haircut slot does not leave room to wash, detangle and even out long hair.",
        "Want to keep your locs? Say so at the start of the appointment, before anything is cut.",
      ] },
      { type: "h2", text: "What happens in the chair" },
      { type: "ul", items: [
        "Wash and conditioning to clear buildup from the scalp and hair.",
        "Detangling, so the new cut is done on hair that is actually even.",
        "The chop and the shape: length, taper and line-up set for the style you chose.",
        "Razor work on the hairline and beard, then a hot-towel massage.",
      ] },
      { type: "quote", text: "Not a haircut… a rebirth.", cite: "Ru, on Instagram" },
      { type: "h2", text: "Going from locs to waves" },
      { type: "p", text: "Locs to waves is a transformation Ru has shown on his feed again and again. After the chop, the wave pattern is trained by brushing consistently and wearing a durag to hold the pattern while you sleep. How fast waves connect depends on your texture, your length and your consistency. Ru will set the length at the chop and tell you what to do between visits." },
      { type: "h2", text: "After the chop" },
      { type: "ul", items: [
        "Expect your scalp to feel lighter and cooler for a few days. Moisturize it.",
        "Come back in two to three weeks to lock in the shape.",
        "Keep the line-up sharp between cuts with an Ultimate Edge Up.",
      ] },
      { type: "cta", text: "Ready for yours? Book the Big Chop Experience.", service: "big-chop-transformation" },
    ],
  },
  {
    slug: "how-to-get-360-waves",
    title: "How to Get 360 Waves: A Hollywood, FL Barber's Guide",
    metaTitle: "How to Get 360 Waves: Barber's Guide",
    description:
      "The honest version of how 360 waves are built: the right cut, brushing, the durag, wolfing, and how your barber keeps the pattern sharp. From RuCutz Premium Grooming.",
    kicker: "Waves",
    photo: "waves-temple",
    published: "2026-09-11",
    readMinutes: 5,
    answer:
      "360 waves come from three things working together: a cut at the right length with a pattern-friendly taper, consistent daily brushing in the direction of your crown, and a durag to hold the pattern overnight. A barber keeps the waves sharp by cutting with the grain and lining up the edges every few weeks.",
    body: [
      { type: "p", text: "Waves are earned. No product does it for you, and no barber can cut them into hair that has not been trained. What a good barber can do is set you up right, then keep the pattern clean as it grows. Here is how it works." },
      { type: "h2", text: "1. Start with the right cut" },
      { type: "p", text: "Waves need enough length for the curl to form but short enough to lie down. Ru sets the length, blends a taper that frames the pattern, and cuts with the grain so the waves are not disrupted. If you are coming from locs or a long afro, start with a big chop." },
      { type: "h2", text: "2. Brush every day" },
      { type: "ul", items: [
        "Brush from the crown outward: forward on top, down on the sides, down in the back.",
        "Short, consistent sessions every day beat one long session a week.",
        "Brush damp hair with a light moisturizer or pomade so the pattern holds.",
      ] },
      { type: "h2", text: "3. Wear the durag" },
      { type: "p", text: "A durag compresses the hair and holds the pattern you brushed while you sleep. Put it on right after brushing, snug but not tight." },
      { type: "h2", text: "4. Decide whether to wolf" },
      { type: "p", text: "Wolfing means going a few weeks without a cut while you keep brushing, so the waves get deeper. It works, but it looks rough in between. Talk to Ru about how long to wolf for your texture and when to come back." },
      { type: "h2", text: "5. Keep the edges sharp" },
      { type: "p", text: "Waves look best framed by a crisp line-up and a clean taper. Between full cuts, the Ultimate Edge Up refreshes the lines without touching the length you have been training." },
      { type: "quote", text: "Your Haircut Is A Statement Piece!", cite: "Ru, on Instagram" },
      { type: "cta", text: "Start your waves right with a King Haircut Experience.", service: "king-haircut-experience" },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
