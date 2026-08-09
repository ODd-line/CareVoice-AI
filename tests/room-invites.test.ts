import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRoomInvite, verifyRoomInvite } from "@/lib/room-invites";

describe("room invitations", () => {
  beforeEach(() => {
    vi.stubEnv("AUTH_SECRET", "test-secret-with-enough-entropy-for-hmac");
    vi.useRealTimers();
  });

  it("accepts the intended recipient and role", () => {
    const token = createRoomInvite("room-1", "patient@example.com", "patient");
    expect(verifyRoomInvite(token, "room-1", "PATIENT@example.com", "patient")).toBe(true);
  });

  it("rejects a forwarded invite for another recipient or role", () => {
    const token = createRoomInvite("room-1", "patient@example.com", "patient");
    expect(verifyRoomInvite(token, "room-1", "attacker@example.com", "patient")).toBe(false);
    expect(verifyRoomInvite(token, "room-1", "patient@example.com", "staff")).toBe(false);
  });

  it("rejects legacy public tokens and tampered signatures", () => {
    expect(verifyRoomInvite("cv-room-demo-2025", "room-1", "patient@example.com", "patient")).toBe(false);
    const token = createRoomInvite("room-1", "patient@example.com", "patient");
    expect(verifyRoomInvite(`${token.slice(0, -1)}x`, "room-1", "patient@example.com", "patient")).toBe(false);
  });

  it("rejects expired invitations", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const token = createRoomInvite("room-1", "patient@example.com", "patient", 60);
    vi.advanceTimersByTime(60_001);
    expect(verifyRoomInvite(token, "room-1", "patient@example.com", "patient")).toBe(false);
  });
});