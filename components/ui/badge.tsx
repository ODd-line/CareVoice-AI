import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "red" | "yellow" | "green" | "blue";
};

const tones = {
  default: "bg-secondary text-secondary-foreground",
  red: "bg-red-100 text-red-800",
  yellow: "bg-amber-100 text-amber-800",
  green: "bg-emerald-100 text-emerald-800",
  blue: "bg-sky-100 text-sky-800"
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)} {...props} />;
}