import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { UserRole } from "@/lib/roles";

const userRoles: UserRole[] = ["patient", "family", "staff"];

function isUserRole(value: unknown): value is UserRole {
  return userRoles.includes(value as UserRole);
}

function canUseRole(email: string | null | undefined, role: UserRole) {
  if (role !== "staff") return true;
  const staffEmails = String(process.env.CAREVOICE_STAFF_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return staffEmails.includes(String(email || "").trim().toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (!isUserRole(token.role)) token.role = "patient";
      if (trigger === "update" && isUserRole(session?.role) && canUseRole(token.email, session.role)) {
        token.role = session.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "mock-user";
        session.user.role = isUserRole(token.role) ? token.role : "patient";
      }
      return session;
    }
  }
});