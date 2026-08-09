import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { secureCareRoom } from "@/lib/mock-data";
import { createRoomInvite } from "@/lib/room-invites";
import type { UserRole } from "@/lib/roles";

const allowedInviteRoles: UserRole[] = ["patient", "family", "staff"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (session.user.role !== "staff") {
    return NextResponse.json({ error: "Only authorized staff can issue room invitations." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const recipientEmail = String(body.recipientEmail || "").trim().toLowerCase();
  const role = String(body.role || "") as UserRole;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail) || recipientEmail.length > 254) {
    return NextResponse.json({ error: "Enter a valid recipient email." }, { status: 400 });
  }
  if (!allowedInviteRoles.includes(role)) {
    return NextResponse.json({ error: "Choose a valid room role." }, { status: 400 });
  }

  const token = createRoomInvite(secureCareRoom.id, recipientEmail, role);
  return NextResponse.json({
    invitePath: `/room/${encodeURIComponent(secureCareRoom.id)}?token=${encodeURIComponent(token)}`,
    expiresInSeconds: 600
  });
}