import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { getPortalRedirect } from "@/lib/portal-access";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const destination = getPortalRedirect(session?.user?.role);
  if (destination) redirect(destination);
  return <AppShell>{children}</AppShell>;
}