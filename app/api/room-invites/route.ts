import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { secureCareRoom } from "@/lib/mock-data";
import { createRoomInvite } from "@/lib/room-invites";
import { getPortalRoleForRoomRole, isRoomMemberRole } from "@/lib/room-access";

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
  const roomRole = String(body.roomRole || "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail) || recipientEmail.length > 254) {
    return NextResponse.json({ error: "Enter a valid recipient email." }, { status: 400 });
  }
  if (!isRoomMemberRole(roomRole)) {
    return NextResponse.json({ error: "Choose a valid room role." }, { status: 400 });
  }

  const role = getPortalRoleForRoomRole(roomRole);
  const token = createRoomInvite(secureCareRoom.id, recipientEmail, role, 600, roomRole);
  return NextResponse.json({
    invitePath: `/room/${encodeURIComponent(secureCareRoom.id)}?token=${encodeURIComponent(token)}`,
    roomRole,
    expiresInSeconds: 600
  });
}