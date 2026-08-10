import { randomInt, randomUUID } from "node:crypto";

export type DevicePairing = {
  id: string;
  code: string;
  patientName: string;
  doctorName: string;
  deviceLabel: string | null;
  status: "waiting" | "linked";
  createdAt: string;
  linkedAt: string | null;
};

const pairings = new Map<string, DevicePairing>();
const pairingLifetimeMs = 15 * 60 * 1000;

function removeExpiredPairings(now = Date.now()) {
  for (const [code, pairing] of pairings) {
    if (pairing.status === "waiting" && now - Date.parse(pairing.createdAt) > pairingLifetimeMs) pairings.delete(code);
  }
}

function newCode() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = String(randomInt(100000, 1_000_000));
    if (!pairings.has(code)) return code;
  }
  throw new Error("Could not allocate a device code.");
}

export function createDevicePairing(patientName: string, doctorName: string) {
  removeExpiredPairings();
  const pairing: DevicePairing = {
    id: randomUUID(),
    code: newCode(),
    patientName,
    doctorName,
    deviceLabel: null,
    status: "waiting",
    createdAt: new Date().toISOString(),
    linkedAt: null
  };
  pairings.set(pairing.code, pairing);
  return pairing;
}

export function claimDevicePairing(code: string, deviceLabel: string) {
  removeExpiredPairings();
  const pairing = pairings.get(code);
  if (!pairing || pairing.status === "linked") return null;
  pairing.deviceLabel = deviceLabel;
  pairing.status = "linked";
  pairing.linkedAt = new Date().toISOString();
  return pairing;
}

export function getDevicePairing(code: string) {
  removeExpiredPairings();
  return pairings.get(code) || null;
}

export function clearDevicePairingsForTests() {
  pairings.clear();
}