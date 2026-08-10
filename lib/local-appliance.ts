function isPrivateIpv4(hostname: string) {
  const parts = hostname.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;
  return parts[0] === 10
    || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
    || (parts[0] === 192 && parts[1] === 168);
}

export function isLocalApplianceHost(hostHeader: string | null) {
  if (!hostHeader) return false;
  const hostname = hostHeader.trim().toLowerCase().replace(/^\[|\](?::\d+)?$/g, "").split(":")[0];
  return hostname === "localhost"
    || hostname === "127.0.0.1"
    || hostname === "::1"
    || hostname.endsWith(".local")
    || isPrivateIpv4(hostname);
}

export function isLocalApplianceRequest(request: Request) {
  return isLocalApplianceHost(request.headers.get("host"));
}

export function getLocalJoinOrigin(request: Request) {
  const configured = process.env.CAREVOICE_LAN_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;
  const host = request.headers.get("host") || "carevoice-micro.local:3000";
  if (host.startsWith("127.0.0.1") || host.startsWith("localhost")) return "http://carevoice-micro.local:3000";
  return `http://${host}`;
}