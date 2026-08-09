"use client";

import { SessionProvider } from "next-auth/react";
import { RoleProvider } from "@/components/role-provider";
import { SupportChat } from "@/components/support-chat";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RoleProvider>{children}<SupportChat /></RoleProvider>
    </SessionProvider>
  );
}