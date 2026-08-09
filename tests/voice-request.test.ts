import { describe, expect, it } from "vitest";
import { voiceAssistantRequestSchema } from "@/lib/voice-request";

describe("voice assistant request schema", () => {
  it("accepts a valid request and supplies the default profile", () => {
    expect(voiceAssistantRequestSchema.parse({ message: "  I feel dizzy  " })).toEqual({
      message: "I feel dizzy",
      personId: "patient-mei-wong"
    });
  });

  it.each([null, {}, { message: ["not", "text"] }, { message: "ok", admin: true }])("rejects malformed input %#", (body) => {
    expect(voiceAssistantRequestSchema.safeParse(body).success).toBe(false);
  });
});