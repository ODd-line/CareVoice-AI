import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { authMock } = vi.hoisted(() => ({ authMock: vi.fn() }));
vi.mock("@/auth", () => ({ auth: authMock }));

import { POST } from "@/app/api/voice-assistant/route";

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/voice-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

describe("voice assistant API", () => {
  beforeEach(() => authMock.mockReset());

  it("returns 401 without an authenticated session", async () => {
    authMock.mockResolvedValue(null);
    const response = await POST(makeRequest({ message: "hello" }));
    expect(response.status).toBe(401);
  });

  it("returns 400 for a malformed authenticated request", async () => {
    authMock.mockResolvedValue({ user: { id: "test-user" } });
    const response = await POST(makeRequest({ message: ["not", "text"] }));
    expect(response.status).toBe(400);
  });
});