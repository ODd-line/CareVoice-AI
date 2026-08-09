import { describe, expect, it } from "vitest";
import { createWhatsAppUrl, isWhatsAppRequest, normalizeWhatsAppNumber } from "@/lib/whatsapp";

describe("WhatsApp handoff", () => {
  it("normalizes an international number and encodes the prepared message", () => {
    expect(normalizeWhatsAppNumber("+852 9123 4567")).toBe("85291234567");
    expect(createWhatsAppUrl("+852 9123 4567", "I need help & water")).toBe(
      "https://wa.me/85291234567?text=I%20need%20help%20%26%20water"
    );
  });

  it("rejects invalid numbers", () => {
    expect(normalizeWhatsAppNumber("123")) .toBeNull();
    expect(createWhatsAppUrl("not a number", "hello")).toBeNull();
  });

  it("recognizes family WhatsApp requests without matching unrelated health text", () => {
    expect(isWhatsAppRequest("Please message my family on WhatsApp")).toBe(true);
    expect(isWhatsAppRequest("I feel dizzy after my medicine")).toBe(false);
  });
});