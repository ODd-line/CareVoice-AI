import { NextResponse } from "next/server";
import { z } from "zod";
import { claimDevicePairing, createDevicePairing, getDevicePairing } from "@/lib/device-pairings";
import { getLocalJoinOrigin, isLocalApplianceRequest } from "@/lib/local-appliance";

const pairingSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("create"), patientName: z.string().trim().min(2).max(80), doctorName: z.string().trim().min(2).max(80) }).strict(),
  z.object({ action: z.literal("claim"), code: z.string().regex(/^\d{6}$/), deviceLabel: z.string().trim().min(2).max(80) }).strict()
]);

function localOnly(request: Request) {
  return isLocalApplianceRequest(request) ? null : NextResponse.json({ error: "Device pairing is disabled on the public web app. Connect to the CareVoice hub on the same local network." }, { status: 403 });
}

export async function GET(request: Request) {
  const denied = localOnly(request);
  if (denied) return denied;
  const pairing = getDevicePairing(new URL(request.url).searchParams.get("code") || "");
  return pairing ? NextResponse.json({ pairing }) : NextResponse.json({ error: "Pairing code not found or expired." }, { status: 404 });
}

export async function POST(request: Request) {
  const denied = localOnly(request);
  if (denied) return denied;
  const parsed = pairingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Check the pairing details and try again." }, { status: 400 });
  if (parsed.data.action === "create") {
    const pairing = createDevicePairing(parsed.data.patientName, parsed.data.doctorName);
    const hub = getLocalJoinOrigin(request);
    return NextResponse.json({ pairing, pairingUrl: `carevoice://pair?hub=${encodeURIComponent(hub)}&code=${pairing.code}` });
  }
  const pairing = claimDevicePairing(parsed.data.code, parsed.data.deviceLabel);
  return pairing ? NextResponse.json({ pairing }) : NextResponse.json({ error: "Pairing code not found, expired, or already used." }, { status: 404 });
}