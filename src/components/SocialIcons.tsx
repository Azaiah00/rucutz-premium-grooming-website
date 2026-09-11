// Minimal line icons for social links (lucide no longer ships brand glyphs).
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };

export const InstagramIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
export const FacebookIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M14.5 8H16V4.8h-2.2C11.6 4.8 10.3 6.2 10.3 8.5V11H8v3.2h2.3V21h3.3v-6.8h2.3l.5-3.2h-2.8V8.9c0-.6.3-.9.9-.9Z" />
  </svg>
);
export const XIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);
