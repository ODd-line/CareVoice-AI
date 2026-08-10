import { describe, expect, it } from "vitest";
import { adminCommandNames, isAdminCommandName, runAdminDiagnostic } from "@/lib/admin-commands";

describe("admin diagnostic commands", () => {
  it("accepts only the named read-only diagnostics", () => {
    expect(adminCommandNames).toEqual(["system:status", "applications:summary", "audit:tail", "security:check"]);
    expect(isAdminCommandName("system:status")).toBe(true);
    expect(isAdminCommandName("rm -rf /" )).toBe(false);
    expect(isAdminCommandName("env")).toBe(false);
  });

  it("reports security controls without exposing environment secrets", () => {
    const output = runAdminDiagnostic("security:check", [], []);
    expect(output).toContain("Arbitrary shell execution: disabled");
    expect(output).toContain("Sensitive environment values: not exposed");
    expect(output.join("\n")).not.toContain("AUTH_SECRET");
  });
});