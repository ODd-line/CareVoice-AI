import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

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

  it("never sends urgent symptoms to a model provider", async () => {
    authMock.mockResolvedValue({ user: { id: "urgent-test-user" } });
    vi.stubEnv("CAREVOICE_LLM_BASE_URL", "https://model.hospital.internal");
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "configured-gemini-key");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ message: "I have chest pain and cannot breathe", personId: "patient-mei-wong" }));
    const result = await response.json() as { urgency: string; safetyMode: string };

    expect(response.status).toBe(200);
    expect(result.urgency).toBe("red");
    expect(result.safetyMode).toBe("deterministic-urgent-rule");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});