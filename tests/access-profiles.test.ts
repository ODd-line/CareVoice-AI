import { describe, expect, it } from "vitest";
import { getAccessProfile, normalizeCareVoiceId } from "@/lib/access-profiles";

describe("CareVoice access profiles", () => {
  it("normalizes IDs entered on the web", () => {
    expect(normalizeCareVoiceId(" cv-7821 ")).toBe("CV-7821");
    expect(getAccessProfile(" cv-7821 ")?.name).toBe("Mei Wong");
  });

  it("maps personal IDs to distinct roles", () => {
    expect(getAccessProfile("CV-2044")?.role).toBe("Nurse");
    expect(getAccessProfile("CV-3108")?.role).toBe("Doctor");
    expect(getAccessProfile("CV-4492")?.role).toBe("Family Member");
  });

  it("does not unlock an unknown ID", () => {
    expect(getAccessProfile("CV-0000")).toBeNull();
  });
});