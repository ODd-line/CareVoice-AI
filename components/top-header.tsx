"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, Settings, UserRound } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockProfile } from "@/lib/mock-data";
import { roleLabels } from "@/lib/roles";
import { useCareVoiceProfile } from "@/components/role-provider";

export function TopHeader() {
  const { data: session, status } = useSession();
  const { profile } = useCareVoiceProfile();
  const user = session?.user;
  const name = user?.name || mockProfile.name;
  const email = user?.email || mockProfile.email;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-8">
      <div className="ml-14 lg:ml-0">
        <p className="text-sm text-muted-foreground">Current workspace</p>
        <h1 className="text-lg font-semibold">{roleLabels[profile.role]}</h1>
      </div>
      <div className="flex items-center gap-3">
        {status === "unauthenticated" ? (
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        ) : (
          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md px-2 py-1 hover:bg-muted">
              <Avatar src={user?.image} name={name} />
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="block text-xs text-muted-foreground">{email}</span>
              </span>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-card p-2 shadow-lg">
              <Link href="/profile" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
                <Settings className="h-4 w-4" /> Profile Settings
              </Link>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground">
                <UserRound className="h-4 w-4" /> {roleLabels[profile.role]}
              </div>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-muted">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </details>
        )}
      </div>
    </header>
  );
}