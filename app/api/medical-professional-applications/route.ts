import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { recordAdminAuditEvent } from "@/lib/admin-audit-store";
import { medicalProfessionalApplicationSchema } from "@/lib/medical-professional";
import { getMedicalProfessionalApplication, listMedicalProfessionalApplications, reviewMedicalProfessionalApplication, submitMedicalProfessionalApplication } from "@/lib/medical-professional-store";

const reviewSchema = z.object({
  accountEmail: z.email().max(254),
  status: z.enum(["approved", "rejected"]),
  reviewNote: z.string().trim().min(5).max(500)
}).strict();

const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Authentication required." }, { status: 401, headers: noStoreHeaders });
  const reviewScope = new URL(request.url).searchParams.get("scope") === "review";
  if (reviewScope) {
    if (session.user.role !== "staff") return NextResponse.json({ error: "Medical Staff reviewer access required." }, { status: 403, headers: noStoreHeaders });
    return NextResponse.json({ applications: listMedicalProfessionalApplications() }, { headers: noStoreHeaders });
  }
  return NextResponse.json({ application: getMedicalProfessionalApplication(session.user.email) }, { headers: noStoreHeaders });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in with Google before submitting professional credentials." }, { status: 401, headers: noStoreHeaders });
  const parsed = medicalProfessionalApplicationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Complete every credential field and confirm the professional attestation." }, { status: 400, headers: noStoreHeaders });
  try {
    const application = submitMedicalProfessionalApplication(session.user.email, parsed.data);
    recordAdminAuditEvent({ actor: session.user.email, action: "application.submitted", target: application.id, detail: `${application.profession} application submitted for manual review.`, outcome: "info" });
    return NextResponse.json({ application }, { status: 201, headers: noStoreHeaders });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not submit this application." }, { status: 409, headers: noStoreHeaders });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "staff") return NextResponse.json({ error: "Medical Staff reviewer access required." }, { status: 403, headers: noStoreHeaders });
  const parsed = reviewSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Choose approve or reject and enter a review note." }, { status: 400, headers: noStoreHeaders });
  const application = reviewMedicalProfessionalApplication(parsed.data.accountEmail, parsed.data.status, session.user.email, parsed.data.reviewNote);
  if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404, headers: noStoreHeaders });
  recordAdminAuditEvent({ actor: session.user.email, action: `application.${parsed.data.status}`, target: application.accountEmail, detail: parsed.data.reviewNote, outcome: "success" });
  return NextResponse.json({ application }, { headers: noStoreHeaders });
}