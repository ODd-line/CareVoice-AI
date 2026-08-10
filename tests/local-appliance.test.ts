import { describe, expect, it } from "vitest";
import { isLocalApplianceHost } from "@/lib/local-appliance";

describe("local appliance boundary", () => {
  it.each(["localhost:3000", "127.0.0.1:3000", "carevoice-micro.local:3000", "192.168.1.9:3000", "10.0.0.4"])("accepts local host %s", (host) => {
    expect(isLocalApplianceHost(host)).toBe(true);
  });

  it.each(["carevoice.example.com", "8.8.8.8", "172.15.0.2", null])("rejects public host %s", (host) => {
    expect(isLocalApplianceHost(host)).toBe(false);
  });
});