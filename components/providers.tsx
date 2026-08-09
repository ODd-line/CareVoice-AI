"use client";

import { SessionProvider } from "next-auth/react";
import { RoleProvider } from "@/components/role-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RoleProvider>{children}</RoleProvider>
    </SessionProvider>
  );
}