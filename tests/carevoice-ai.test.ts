import { afterEach, describe, expect, it, vi } from "vitest";
import { generateCareVoiceReply } from "@/lib/carevoice-ai";

describe("CareVoice model adapters", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does not call an external model without a server API key", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "");
    vi.stubEnv("CAREVOICE_LLM_BASE_URL", "");

    await expect(generateCareVoiceReply("I want to call my family", "en-US")).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("prefers bounded output from the hospital model service", async () => {
    vi.stubEnv("CAREVOICE_LLM_BASE_URL", "https://model.hospital.internal");
    vi.stubEnv("CAREVOICE_LLM_API_KEY", "internal-test-token");
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "gemini-must-not-be-used");
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({
        urgency: "green",
        reply: "I can open your approved family contact.",
        actions: ["Open family contact"]
      }) } }]
    }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(generateCareVoiceReply("Please call my family", "en-US")).resolves.toEqual({
      urgency: "green",
      reply: "I can open your approved family contact.",
      actions: ["Open family contact"]
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(url.toString()).toBe("https://model.hospital.internal/v1/chat/completions");
    expect(options.headers).toMatchObject({ Authorization: "Bearer internal-test-token" });
  });

  it("rejects unsafe instructions from the hospital model", async () => {
    vi.stubEnv("CAREVOICE_LLM_BASE_URL", "https://model.hospital.internal");
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({
        urgency: "yellow",
        reply: "Take another pill now.",
        actions: ["Change your dose"]
      }) } }]
    }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await expect(generateCareVoiceReply("I forgot my medication", "en-US")).resolves.toBeNull();
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