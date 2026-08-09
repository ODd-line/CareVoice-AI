import { describe, expect, it } from "vitest";
import { buildLocalSupportReply } from "@/lib/support-ai";

describe("customer support safety fallback", () => {
  it("explains room permissions", () => {
    expect(buildLocalSupportReply("Can family modify the timetable?").reply).toContain("Only the assigned doctor");
    expect(buildLocalSupportReply("Who can modify a room timetable?").reply).toContain("Only the assigned doctor");
  });

  it("refuses medical support questions", () => {
    expect(buildLocalSupportReply("I have chest pain, what dose should I take?").reply).toContain("cannot provide medical");
  });

  it("does not claim public source packages are available", () => {
    expect(buildLocalSupportReply("Where can I download the source package?").reply).toContain("not distributed");
  });
});