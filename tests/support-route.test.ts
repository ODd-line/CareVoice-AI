import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/support/route";

function makeRequest(message: string) {
  return new NextRequest("http://localhost/api/support", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `test-${Math.random()}` },
    body: JSON.stringify({ message })
  });
}

describe("support API safety routing", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("never sends medical questions to a model provider", async () => {
    vi.stubEnv("CAREVOICE_LLM_BASE_URL", "https://model.hospital.internal");
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "configured-gemini-key");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest("I have chest pain. What medicine dose should I take?"));
    const result = await response.json() as { reply: string; mode: string };

    expect(response.status).toBe(200);
    expect(result.reply).toContain("cannot provide medical");
    expect(result.mode).toBe("local-support-fallback");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});