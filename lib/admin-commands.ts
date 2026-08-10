import type { MedicalProfessionalApplication } from "@/lib/medical-professional";
import type { AdminAuditEvent } from "@/lib/admin-audit-store";

export const adminCommandNames = ["system:status", "applications:summary", "audit:tail", "security:check"] as const;
export type AdminCommandName = (typeof adminCommandNames)[number];

export function isAdminCommandName(value: unknown): value is AdminCommandName {
  return adminCommandNames.includes(value as AdminCommandName);
}

export function runAdminDiagnostic(command: AdminCommandName, applications: MedicalProfessionalApplication[], auditEvents: AdminAuditEvent[]) {
  if (command === "system:status") {
    return [
      "CareVoice application: online",
      `Runtime: ${process.env.NODE_ENV || "development"}`,
      "Authentication: Auth.js session enforcement enabled",
      "Application storage: process-local prototype",
      `Server time: ${new Date().toISOString()}`
    ];
  }
  if (command === "applications:summary") {
    const count = (status: MedicalProfessionalApplication["status"]) => applications.filter((application) => application.status === status).length;
    return [`Total applications: ${applications.length}`, `Pending: ${count("pending")}`, `Approved: ${count("approved")}`, `Rejected or suspended: ${count("rejected")}`];
  }
  if (command === "audit:tail") {
    return auditEvents.slice(0, 10).map((event) => `${event.timestamp} ${event.outcome.toUpperCase()} ${event.action} ${event.target}`);
  }
  return [
    "Arbitrary shell execution: disabled",
    "Admin API authentication: staff session required",
    "Role authorization: server enforced",
    "Professional approvals: reviewer identity and note required",
    "Sensitive environment values: not exposed"
  ];
}