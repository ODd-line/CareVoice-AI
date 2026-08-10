import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { isAdminCommandName, runAdminDiagnostic } from "@/lib/admin-commands";
import { listAdminAuditEvents, recordAdminAuditEvent } from "@/lib/admin-audit-store";
import { careVoicePeople } from "@/lib/mock-data";
import { listMedicalProfessionalApplications, reviewMedicalProfessionalApplication } from "@/lib/medical-professional-store";

const commandSchema = z.object({ command: z.string().max(80) }).strict();
const accessSchema = z.object({
  accountEmail: z.email().max(254),
  access: z.enum(["active", "suspended"]),
  reason: z.string().trim().min(5).max(300)
}).strict();
const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

async function requireStaff() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "staff") return null;
  return { email: session.user.email, name: session.user.name || "Medical Staff" };
}

export async function GET() {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: "Staff administrator access required." }, { status: 403, headers: noStoreHeaders });
  const applications = listMedicalProfessionalApplications();
  return NextResponse.json({
    currentAdmin: session,
    applications,
    people: [
      ...careVoicePeople.map((person) => ({ id: person.id, name: person.name, role: person.role, email: null, access: "demo", roomId: person.roomId })),
      ...applications.map((application) => ({ id: application.id, name: application.legalName, role: application.profession, email: application.accountEmail, access: application.status === "approved" ? "active" : application.status, roomId: null }))
    ],
    auditEvents: listAdminAuditEvents(),
    commands: ["system:status", "applications:summary", "audit:tail", "security:check"]
  }, { headers: noStoreHeaders });
}

export async function POST(request: Request) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: "Staff administrator access required." }, { status: 403, headers: noStoreHeaders });
  const parsed = commandSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !isAdminCommandName(parsed.data.command)) {
    recordAdminAuditEvent({ actor: session.email, action: "diagnostic.denied", target: "command-console", detail: "Unknown or non-allowlisted command rejected.", outcome: "denied" });
    return NextResponse.json({ error: "Only the listed read-only diagnostics can be run." }, { status: 400, headers: noStoreHeaders });
  }
  const output = runAdminDiagnostic(parsed.data.command, listMedicalProfessionalApplications(), listAdminAuditEvents());
  recordAdminAuditEvent({ actor: session.email, action: "diagnostic.run", target: parsed.data.command, detail: "Read-only diagnostic completed.", outcome: "success" });
  return NextResponse.json({ command: parsed.data.command, output, executedAt: new Date().toISOString() }, { headers: noStoreHeaders });
}

export async function PATCH(request: Request) {
  const session = await requireStaff();
  if (!session) return NextResponse.json({ error: "Staff administrator access required." }, { status: 403, headers: noStoreHeaders });
  const parsed = accessSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Choose an access state and provide an audit reason." }, { status: 400, headers: noStoreHeaders });
  const status = parsed.data.access === "active" ? "approved" : "rejected";
  const application = reviewMedicalProfessionalApplication(parsed.data.accountEmail, status, session.email, parsed.data.reason);
  if (!application) return NextResponse.json({ error: "Managed professional account not found." }, { status: 404, headers: noStoreHeaders });
  recordAdminAuditEvent({ actor: session.email, action: `account.${parsed.data.access}`, target: parsed.data.accountEmail, detail: parsed.data.reason, outcome: "success" });
  return NextResponse.json({ application }, { headers: noStoreHeaders });
}