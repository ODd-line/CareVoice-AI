import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPortalRedirect } from "@/lib/portal-access";

export default async function PatientLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const destination = getPortalRedirect(session?.user?.role, "patient");
  if (destination) redirect(destination);
  return children;
}