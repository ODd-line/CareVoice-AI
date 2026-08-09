import { afterEach, describe, expect, it, vi } from "vitest";
import { generateCareVoiceReply } from "@/lib/carevoice-ai";

describe("CareVoice Gemini adapter", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does not call an external model without a server API key", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "");

    await expect(generateCareVoiceReply("I want to call my family", "en-US")).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts bounded structured model output", async () => {
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify({
        urgency: "green",
        reply: "I can help prepare a family call.",
        actions: ["Open approved family contact"]
      }) }] } }]
    }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await expect(generateCareVoiceReply("Please call my son", "en-US")).resolves.toEqual({
      urgency: "green",
      reply: "I can help prepare a family call.",
      actions: ["Open approved family contact"]
    });
  });

  it("rejects malformed or over-permissive model output", async () => {
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify({
        urgency: "red",
        reply: "Change your medication dose.",
        actions: ["Take another pill"]
      }) }] } }]
    }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await expect(generateCareVoiceReply("Should I change my dose?", "en-US")).resolves.toBeNull();
  });
});