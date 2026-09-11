import { AnkhImg } from "../Brand";

const WORDS = ["Fades", "Tapers", "360 Waves", "Beards", "Big Chops", "Enhancements", "Hot Towel", "Razor Work", "All Textures", "Signature Scent"];

export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {WORDS.map((w) => (
        <li key={w} className="flex items-center">
          <span className="display px-6 text-[clamp(2.2rem,5vw,4rem)] text-bone">{w}</span>
          <AnkhImg className="h-8 opacity-80 md:h-10" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What Ru does" className="relative overflow-hidden border-y border-line bg-ink-2 py-6">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-2 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-2 to-transparent" aria-hidden />
    </section>
  );
}
