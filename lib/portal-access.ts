import type { UserRole } from "@/lib/roles";

export function getPortalRedirect(sessionRole?: UserRole, requiredRole?: UserRole) {
  if (!sessionRole) return "/?reason=authentication-required";
  if (requiredRole && sessionRole !== requiredRole) return `/${sessionRole}/dashboard`;
  return null;
}