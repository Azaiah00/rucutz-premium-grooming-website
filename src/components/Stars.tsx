/** Five stars as one <svg> with a single path and four <use> refs, instead of five icons. */
export function Stars({ className = "h-4 w-auto", label = "5 out of 5 stars" }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 94 18" className={className} role="img" aria-label={label} fill="currentColor">
      <path id="rc-star" d="M9 1.5l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L4.5 15.3l.9-5L1.8 6.8l5-.7L9 1.5Z" />
      <use href="#rc-star" x="19" />
      <use href="#rc-star" x="38" />
      <use href="#rc-star" x="57" />
      <use href="#rc-star" x="76" />
    </svg>
  );
}
