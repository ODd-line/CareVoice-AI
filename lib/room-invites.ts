import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { canPortalRoleUseRoomRole, type RoomMemberRole } from "@/lib/room-access";
import type { UserRole } from "@/lib/roles";

export type RoomInvitePayload = {
  roomId: string;
  recipientEmail: string;
  role: UserRole;
  roomRole: RoomMemberRole;
  expiresAt: number;
  nonce: string;
};

function getInviteSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is required to issue room invitations.");
  return secret;
}

function sign(encodedPayload: string) {
  return createHmac("sha256", getInviteSecret()).update(encodedPayload).digest("base64url");
}

function defaultRoomRole(role: UserRole): RoomMemberRole {
  if (role === "staff") return "doctor";
  return role;
}

export function createRoomInvite(roomId: string, recipientEmail: string, role: UserRole, ttlSeconds = 600, roomRole = defaultRoomRole(role)) {
  if (!canPortalRoleUseRoomRole(role, roomRole)) {
    throw new Error("Room role is incompatible with the invited portal role.");
  }
  const payload: RoomInvitePayload = {
    roomId,
    recipientEmail: recipientEmail.trim().toLowerCase(),
    role,
    roomRole,
    expiresAt: Date.now() + ttlSeconds * 1000,
    nonce: randomBytes(16).toString("base64url")
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function getVerifiedRoomInvite(token: string | undefined, expectedRoomId: string, expectedEmail: string, expectedRole: UserRole) {
  if (!token) return null;
  const [encodedPayload, suppliedSignature] = token.split(".");
  if (!encodedPayload || !suppliedSignature) return null;

  try {
    const expectedSignature = sign(encodedPayload);
    const supplied = Buffer.from(suppliedSignature, "base64url");
    const expected = Buffer.from(expectedSignature, "base64url");
    if (supplied.toString("base64url") !== suppliedSignature
      || supplied.length !== expected.length
      || !timingSafeEqual(supplied, expected)) return null;
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as Partial<RoomInvitePayload>;
    const valid = payload.roomId === expectedRoomId
      && payload.recipientEmail === expectedEmail.trim().toLowerCase()
      && payload.role === expectedRole
      && canPortalRoleUseRoomRole(expectedRole, payload.roomRole as RoomMemberRole)
      && typeof payload.expiresAt === "number"
      && payload.expiresAt > Date.now()
      && typeof payload.nonce === "string"
      && payload.nonce.length >= 16;
    return valid ? payload as RoomInvitePayload : null;
  } catch {
    return null;
  }
}

export function verifyRoomInvite(token: string | undefined, expectedRoomId: string, expectedEmail: string, expectedRole: UserRole) {
  return Boolean(getVerifiedRoomInvite(token, expectedRoomId, expectedEmail, expectedRole));
}