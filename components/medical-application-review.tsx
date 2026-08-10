"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, ExternalLink, ShieldX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { medicalProfessionLabels, type MedicalApplicationStatus, type MedicalProfessionalApplication } from "@/lib/medical-professional";

export function MedicalApplicationReview() {
  const [applications, setApplications] = useState<MedicalProfessionalApplication[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("Loading professional applications...");
  const [reviewing, setReviewing] = useState("");

  async function loadApplications() {
    const response = await fetch("/api/medical-professional-applications?scope=review", { cache: "no-store" });
    const result = await response.json() as { applications?: MedicalProfessionalApplication[]; error?: string };
    if (!response.ok || !result.applications) throw new Error(result.error || "Could not load applications.");
    setApplications(result.applications);
    setStatus(result.applications.length ? "" : "No medical professional applications yet.");
  }

  useEffect(() => {
    void loadApplications().catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Could not load applications."));
  }, []);

  async function review(application: MedicalProfessionalApplication, nextStatus: Exclude<MedicalApplicationStatus, "pending">) {
    const reviewNote = notes[application.id]?.trim() || "";
    if (reviewNote.length < 5) {
      setStatus("Enter a review note before approving or rejecting an application.");
      return;
    }
    setReviewing(application.id);
    setStatus("Saving manual review...");
    try {
      const response = await fetch("/api/medical-professional-applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountEmail: application.accountEmail, status: nextStatus, reviewNote })
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not save this review.");
      await loadApplications();
      setStatus(`Application ${nextStatus}. The applicant can see this decision in Settings.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save this review.");
    } finally {
      setReviewing("");
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>Medical Professional Applications</CardTitle><CardDescription>Manual credential review. Approval is bound to the applicant&apos;s signed-in account email.</CardDescription></CardHeader>
      <CardContent className="space-y-4">
        {applications.map((application) => <article key={application.id} className="rounded-md border p-4">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold">{application.legalName}</h3><p className="text-sm text-muted-foreground">{medicalProfessionLabels[application.profession]} · {application.hospital} · {application.department}</p></div><Badge tone={application.status === "approved" ? "green" : application.status === "rejected" ? "red" : "yellow"}>{application.status}</Badge></div>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div><dt className="text-xs text-muted-foreground">Account</dt><dd className="break-all font-semibold">{application.accountEmail}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Work email</dt><dd className="break-all font-semibold">{application.workEmail}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Registration ID</dt><dd className="font-semibold">{application.medicalRegistrationId}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Authority</dt><dd className="font-semibold">{application.licensingAuthority}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Region</dt><dd className="font-semibold">{application.countryOrRegion}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Experience</dt><dd className="font-semibold">{application.yearsExperience} years</dd></div>
          </dl>
          <p className="mt-4 rounded-md bg-muted p-3 text-sm">{application.professionalStatement}</p>
          <div className="mt-3 flex flex-wrap gap-2"><Button size="sm" variant="outline" asChild><a href={application.proofUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> Verify evidence</a></Button></div>
          <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]"><Input value={notes[application.id] || application.reviewNote || ""} onChange={(event) => setNotes({ ...notes, [application.id]: event.target.value })} placeholder="Required manual review note" aria-label={`Review note for ${application.legalName}`} /><Button disabled={reviewing === application.id} onClick={() => void review(application, "approved")}><BadgeCheck className="h-4 w-4" /> Approve</Button><Button variant="destructive" disabled={reviewing === application.id} onClick={() => void review(application, "rejected")}><ShieldX className="h-4 w-4" /> Reject</Button></div>
        </article>)}
        {status ? <p className="rounded-md bg-muted p-3 text-sm" role="status">{status}</p> : null}
      </CardContent>
    </Card>
  );
}