import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  className?: string;
  size?: number;
};

export function Avatar({ src, name, className, size = 40 }: AvatarProps) {
  const initials = String(name || "CV")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-primary-foreground", className)} style={{ width: size, height: size }}>
      {src ? <Image src={src} alt={`${name || "User"} profile picture`} fill sizes={`${size}px`} className="object-cover" /> : <span className="text-sm font-bold">{initials}</span>}
    </div>
  );
}