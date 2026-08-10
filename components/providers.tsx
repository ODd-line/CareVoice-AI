"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { RoleProvider } from "@/components/role-provider";
import { SupportChat } from "@/components/support-chat";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/desktop") return children;

  return (
    <SessionProvider>
      <RoleProvider>{children}<SupportChat /></RoleProvider>
    </SessionProvider>
  );
}