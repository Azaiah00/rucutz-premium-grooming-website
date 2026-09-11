import { Camera } from "lucide-react";
import { cn } from "@/lib/cn";

/** Branded placeholder that makes a missing real photo impossible to ship unnoticed. */
export function PhotoSlot({ brief, className }: { brief: string; className?: string }) {
  return (
    <div
      className={cn("needs-asset flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center", className)}
      role="img"
      aria-label={`Photo coming soon: ${brief}`}
    >
      <Camera className="h-7 w-7 text-gold" aria-hidden />
      <p className="eyebrow text-gold">Needs real photo</p>
      <p className="max-w-[28ch] text-sm text-bone-dim">{brief}</p>
    </div>
  );
}
