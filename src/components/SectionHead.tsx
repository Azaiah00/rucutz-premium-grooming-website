import { cn } from "@/lib/cn";

type Props = {
  tag: string; // Rock Salt graffiti kicker, like Ru's "Service Menu"
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHead({ tag, title, intro, align = "left", id, className, as: H = "h2" }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("spray tag mb-5 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold", align === "left" ? "-rotate-2" : "-rotate-1")} aria-hidden>
        {tag}
      </p>
      <H id={id} className="reveal display text-[clamp(2.8rem,7vw,5.6rem)]">
        {title}
      </H>
      {intro && <div className="reveal mt-6 text-lg text-bone-dim" style={{ ["--d" as string]: "120ms" }}>{intro}</div>}
    </div>
  );
}
