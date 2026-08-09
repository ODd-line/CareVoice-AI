import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPortalRedirect } from "@/lib/portal-access";

export default async function FamilyLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const destination = getPortalRedirect(session?.user?.role, "family");
  if (destination) redirect(destination);
  return children;
}