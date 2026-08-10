import "server-only";

import { randomUUID } from "node:crypto";

export type AdminAuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  detail: string;
  outcome: "success" | "denied" | "info";
};

type AuditStore = AdminAuditEvent[];

const globalStore = globalThis as typeof globalThis & { careVoiceAdminAudit?: AuditStore };
const auditEvents = globalStore.careVoiceAdminAudit ?? [];
globalStore.careVoiceAdminAudit = auditEvents;

export function recordAdminAuditEvent(event: Omit<AdminAuditEvent, "id" | "timestamp">) {
  const recorded: AdminAuditEvent = {
    ...event,
    id: randomUUID(),
    timestamp: new Date().toISOString()
  };
  auditEvents.unshift(recorded);
  if (auditEvents.length > 500) auditEvents.length = 500;
  return recorded;
}

export function listAdminAuditEvents(limit = 100) {
  return auditEvents.slice(0, Math.max(1, Math.min(limit, 500)));
}

export function clearAdminAuditEventsForTests() {
  auditEvents.length = 0;
}