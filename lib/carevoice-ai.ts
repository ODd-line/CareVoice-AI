import "server-only";

import { z } from "zod";

export type CareVoiceReply = {
  urgency: "green" | "yellow" | "red";
  reply: string;
  actions: string[];
};

const modelReplySchema = z.object({
  urgency: z.enum(["green", "yellow"]),
  reply: z.string().trim().min(1).max(700),
  actions: z.array(z.string().trim().min(1).max(80)).max(3)
}).strict();

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function parseModelJson(text: string) {
  const normalized = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const parsed = JSON.parse(normalized) as unknown;
  return modelReplySchema.parse(parsed);
}

export async function generateCareVoiceReply(message: string, language: string): Promise<CareVoiceReply | null> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.CAREVOICE_GEMINI_MODEL || "gemini-2.5-flash";
  const prompt = [
    "You are CareVoice, a calm communication assistant for an older adult.",
    "You may help the person describe symptoms, record a medication question, understand their calendar, contact approved family, or prepare a concise care-team summary.",
    "You are not a doctor. Never diagnose, prescribe, recommend changing a dose, claim that an alert was actually delivered, or reassure away a potentially serious symptom.",
    "Use short sentences and the user's language when practical.",
    "Return only JSON with urgency (green or yellow), reply, and up to three brief suggested actions.",
    `Preferred language: ${language}`,
    `User message: ${message}`
  ].join("\n");

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 320,
          responseMimeType: "application/json"
        }
      }),
      signal: AbortSignal.timeout(8_000)
    });
    if (!response.ok) return null;
    const result = await response.json() as GeminiResponse;
    const text = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
    if (!text) return null;
    return parseModelJson(text);
  } catch {
    return null;
  }
}