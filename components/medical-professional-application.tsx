"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { ChevronDown, LogIn, Send, Stethoscope, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { medicalProfessionLabels, medicalProfessionValues, type MedicalProfessionalApplication } from "@/lib/medical-professional";

const emptyDraft = {
  legalName: "",
  profession: "doctor",
  medicalRegistrationId: "",
  licensingAuthority: "",
  hospital: "",
  department: "",
  countryOrRegion: "Hong Kong",
  workEmail: "",
  workPhone: "",
  yearsExperience: "",
  proofUrl: "",
  professionalStatement: "",
  attested: false
};

export function MedicalProfessionalApplicationForm() {
  const { data: session, status: sessionStatus } = useSession();
  const [draft, setDraft] = useState(emptyDraft);
  const [application, setApplication] = useState<MedicalProfessionalApplication | null>(null);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;
    let active = true;
    const timer = window.setTimeout(() => {
      setDraft((current) => ({ ...current, legalName: current.legalName || session.user?.name || "", workEmail: current.workEmail || session.user?.email || "" }));
    }, 0);
    void fetch("/api/medical-professional-applications", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { application?: MedicalProfessionalApplication | null }) => { if (active) setApplication(result.application || null); })
      .catch(() => { if (active) setStatus("Application status is temporarily unavailable."); });
    return () => { active = false; window.clearTimeout(timer); };
  }, [session?.user?.email, session?.user?.name]);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.user?.email) {
      await signIn("google", { callbackUrl: "/#medical-professionals" });
      return;
    }
    setSubmitting(true);
    setStatus("Submitting credentials for manual review...");
    try {
      const response = await fetch("/api/medical-professional-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });
      const result = await response.json() as { application?: MedicalProfessionalApplication; error?: string };
      if (!response.ok || !result.application) throw new Error(result.error || "Could not submit this application.");
      setApplication(result.application);
      setStatus("Application received. Authorized Medical Staff must review it before access changes.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not submit this application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="medical-professionals" className="product-band bg-[#d9e9ff]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#1263a0]"><Stethoscope className="h-6 w-6" /></span>
            <div>
              <p className="product-kicker">Professional access</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">Are you a healthcare professional?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#45534c]">Apply for verified Medical Staff access. Your professional registration and workplace details will be manually reviewed.</p>
            </div>
          </div>
          {!application ? <Button className="shrink-0" variant="outline" aria-expanded={showForm} aria-controls="professional-application-form" onClick={() => setShowForm((current) => !current)}>{showForm ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}{showForm ? "Close application" : "Apply for staff access"}</Button> : null}
        </div>

        {application ? <div className="mt-6 border-l-4 border-[#1263a0] bg-white/70 p-4"><Badge tone={application.status === "approved" ? "green" : application.status === "rejected" ? "red" : "yellow"}>{application.status}</Badge><p className="mt-2 text-sm font-bold">Professional application {application.id.slice(0, 8)}</p><p className="mt-1 text-xs text-[#45534c]">Submitted {new Date(application.submittedAt).toLocaleString()}</p>{application.reviewNote ? <p className="mt-2 text-sm">Review note: {application.reviewNote}</p> : null}</div> : null}

        {showForm && !application ? <form id="professional-application-form" className="mt-8 grid gap-4 border border-black/15 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-6" onSubmit={(event) => void submitApplication(event)}>
          <div className="grid gap-2"><Label htmlFor="professional-name">Legal name</Label><Input id="professional-name" value={draft.legalName} onChange={(event) => setDraft({ ...draft, legalName: event.target.value })} required /></div>
          <div className="grid gap-2"><Label htmlFor="profession">Profession</Label><select id="profession" className="h-10 rounded-md border bg-background px-3 text-sm" value={draft.profession} onChange={(event) => setDraft({ ...draft, profession: event.target.value })}>{medicalProfessionValues.map((profession) => <option key={profession} value={profession}>{medicalProfessionLabels[profession]}</option>)}</select></div>
          <div className="grid gap-2"><Label htmlFor="registration-id">Medical registration / licence ID</Label><Input id="registration-id" value={draft.medicalRegistrationId} onChange={(event) => setDraft({ ...draft, medicalRegistrationId: event.target.value })} placeholder="Example: MCHK-12345" required /></div>
          <div className="grid gap-2"><Label htmlFor="licensing-authority">Licensing authority</Label><Input id="licensing-authority" value={draft.licensingAuthority} onChange={(event) => setDraft({ ...draft, licensingAuthority: event.target.value })} placeholder="Medical Council or Nursing Council" required /></div>
          <div className="grid gap-2"><Label htmlFor="professional-hospital">Hospital / organization</Label><Input id="professional-hospital" value={draft.hospital} onChange={(event) => setDraft({ ...draft, hospital: event.target.value })} required /></div>
          <div className="grid gap-2"><Label htmlFor="professional-department">Department / ward</Label><Input id="professional-department" value={draft.department} onChange={(event) => setDraft({ ...draft, department: event.target.value })} required /></div>
          <div className="grid gap-2"><Label htmlFor="professional-region">Country or region</Label><Input id="professional-region" value={draft.countryOrRegion} onChange={(event) => setDraft({ ...draft, countryOrRegion: event.target.value })} required /></div>
          <div className="grid gap-2"><Label htmlFor="professional-experience">Years of professional experience</Label><Input id="professional-experience" type="number" min="0" max="70" value={draft.yearsExperience} onChange={(event) => setDraft({ ...draft, yearsExperience: event.target.value })} required /></div>
          <div className="grid gap-2"><Label htmlFor="professional-email">Official work email</Label><Input id="professional-email" type="email" value={draft.workEmail} onChange={(event) => setDraft({ ...draft, workEmail: event.target.value })} required /></div>
          <div className="grid gap-2"><Label htmlFor="professional-phone">Official work phone</Label><Input id="professional-phone" type="tel" value={draft.workPhone} onChange={(event) => setDraft({ ...draft, workPhone: event.target.value })} required /></div>
          <div className="grid gap-2 sm:col-span-2"><Label htmlFor="professional-proof">Public verification or proof URL</Label><Input id="professional-proof" type="url" value={draft.proofUrl} onChange={(event) => setDraft({ ...draft, proofUrl: event.target.value })} placeholder="Hospital directory, regulator register, or credential document link" required /></div>
          <div className="grid gap-2 sm:col-span-2"><Label htmlFor="professional-statement">Professional role and reason for access</Label><textarea id="professional-statement" className="min-h-28 rounded-md border bg-background p-3 text-sm" minLength={40} maxLength={1200} value={draft.professionalStatement} onChange={(event) => setDraft({ ...draft, professionalStatement: event.target.value })} required /></div>
          <label className="flex items-start gap-3 border border-black/15 bg-[#f2f4ed] p-3 text-sm sm:col-span-2"><input className="mt-1" type="checkbox" checked={draft.attested} onChange={(event) => setDraft({ ...draft, attested: event.target.checked })} required /><span><strong className="block">Professional attestation</strong>I confirm these credentials are mine, current, and may be manually verified with the licensing authority or hospital.</span></label>
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <Button type="submit" disabled={submitting || sessionStatus === "loading"}>{session?.user ? <Send className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}{submitting ? "Submitting..." : session?.user ? "Submit for manual review" : "Sign in to apply"}</Button>
            <p className="text-xs text-[#45534c]">{session?.user?.email ? `Application account: ${session.user.email}` : "Google sign-in is required before credentials can be submitted."}</p>
          </div>
          {status ? <p className="text-sm font-semibold sm:col-span-2" role="status">{status}</p> : null}
        </form> : null}
      </div>
    </section>
  );
}