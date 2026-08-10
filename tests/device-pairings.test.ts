import { beforeEach, describe, expect, it } from "vitest";
import { claimDevicePairing, clearDevicePairingsForTests, createDevicePairing, getDevicePairing } from "@/lib/device-pairings";

describe("bedside device pairing", () => {
  beforeEach(() => clearDevicePairingsForTests());

  it("binds one local device to the named patient and doctor", () => {
    const waiting = createDevicePairing("Mrs Wong", "Dr Lee");
    const linked = claimDevicePairing(waiting.code, "Bedside Controller 12");
    expect(linked).toMatchObject({ patientName: "Mrs Wong", doctorName: "Dr Lee", deviceLabel: "Bedside Controller 12", status: "linked" });
    expect(getDevicePairing(waiting.code)?.linkedAt).toBeTruthy();
  });

  it("makes pairing codes single use", () => {
    const waiting = createDevicePairing("Mrs Wong", "Dr Lee");
    expect(claimDevicePairing(waiting.code, "Controller A")).toBeTruthy();
    expect(claimDevicePairing(waiting.code, "Controller B")).toBeNull();
  });
});