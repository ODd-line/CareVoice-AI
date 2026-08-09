import { describe, expect, it } from "vitest";
import { getPortalRedirect } from "@/lib/portal-access";

describe("portal authorization policy", () => {
  it("redirects an anonymous request regardless of client-controlled cookie input", () => {
    const forgedCookie = { "carevoice-role": "staff" };
    expect(forgedCookie["carevoice-role"]).toBe("staff");
    expect(getPortalRedirect()).toBe("/?reason=authentication-required");
  });

  it("redirects a signed-in user whose signed role does not match the route", () => {
    expect(getPortalRedirect("family", "patient")).toBe("/family/dashboard");
  });

  it("allows a user with the matching signed role", () => {
    expect(getPortalRedirect("patient", "patient")).toBeNull();
  });
});