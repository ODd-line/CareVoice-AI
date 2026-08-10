import "server-only";

import type { z } from "zod";

type ChatCompletionResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

function normalizeModelJson(value: string) {
  return value.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
}

export async function generateSelfHostedJson<T>(prompt: string, schema: z.ZodType<T>, options: { temperature: number; maxTokens: number }): Promise<T | null> {
  const configuredUrl = process.env.CAREVOICE_LLM_BASE_URL?.trim();
  if (!configuredUrl) return null;

  try {
    const baseUrl = new URL(configuredUrl);
    if (!['http:', 'https:'].includes(baseUrl.protocol)) return null;
    const endpoint = new URL("v1/chat/completions", `${baseUrl.toString().replace(/\/$/, "")}/`);
    const token = process.env.CAREVOICE_LLM_API_KEY?.trim();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        model: process.env.CAREVOICE_LLM_MODEL || "carevoice-qwen-3b",
        messages: [{ role: "user", content: prompt }],
        temperature: options.temperature,
        max_tokens: options.maxTokens,
        response_format: { type: "json_object" }
      }),
      signal: AbortSignal.timeout(12_000)
    });
    if (!response.ok) return null;
    const result = await response.json() as ChatCompletionResponse;
    const content = result.choices?.[0]?.message?.content;
    if (!content) return null;
    return schema.parse(JSON.parse(normalizeModelJson(content)) as unknown);
  } catch {
    return null;
  }
}