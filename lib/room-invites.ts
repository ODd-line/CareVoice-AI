import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { UserRole } from "@/lib/roles";

type RoomInvitePayload = {
  roomId: string;
  recipientEmail: string;
  role: UserRole;
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

export function createRoomInvite(roomId: string, recipientEmail: string, role: UserRole, ttlSeconds = 600) {
  const payload: RoomInvitePayload = {
    roomId,
    recipientEmail: recipientEmail.trim().toLowerCase(),
    role,
    expiresAt: Date.now() + ttlSeconds * 1000,
    nonce: randomBytes(16).toString("base64url")
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyRoomInvite(token: string | undefined, expectedRoomId: string, expectedEmail: string, expectedRole: UserRole) {
  if (!token) return false;
  const [encodedPayload, suppliedSignature] = token.split(".");
  if (!encodedPayload || !suppliedSignature) return false;

  try {
    const expectedSignature = sign(encodedPayload);
    const supplied = Buffer.from(suppliedSignature, "base64url");
    const expected = Buffer.from(expectedSignature, "base64url");
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return false;
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as Partial<RoomInvitePayload>;
    return payload.roomId === expectedRoomId
      && payload.recipientEmail === expectedEmail.trim().toLowerCase()
      && payload.role === expectedRole
      && typeof payload.expiresAt === "number"
      && payload.expiresAt > Date.now()
      && typeof payload.nonce === "string"
      && payload.nonce.length >= 16;
  } catch {
    return false;
  }
}