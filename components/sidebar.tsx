"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { roleLabels, roleNav } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { useCareVoiceProfile } from "@/components/role-provider";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { profile } = useCareVoiceProfile();
  const nav = roleNav[profile.role];

  return (
    <>
      <Button className="fixed left-4 top-4 z-50 lg:hidden" size="icon" variant="outline" onClick={() => setOpen(true)} aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </Button>
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-72 border-r bg-card transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <Link href="/" className="flex items-center gap-3 font-bold">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
                <HeartPulse className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg">CareVoice</span>
                <span className="block text-xs text-muted-foreground">{roleLabels[profile.role]}</span>
              </span>
            </Link>
            <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Role navigation">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn("flex min-h-12 items-center gap-3 rounded-md px-3 text-sm font-semibold transition", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <div className="border-t p-4 text-xs text-muted-foreground">RBAC navigation changes automatically when the saved role changes.</div>
        </div>
      </aside>
      {open ? <button className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" /> : null}
    </>
  );
}