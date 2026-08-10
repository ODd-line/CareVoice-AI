"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BadgeCheck, ExternalLink, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCareVoiceProfile } from "@/components/role-provider";
import { medicalProfessionLabels, type MedicalProfessionalApplication } from "@/lib/medical-professional";

export function MedicalProfessionalSettings() {
  const { data: session } = useSession();
  const router = useRouter();
  const { setRole } = useCareVoiceProfile();
  const [application, setApplication] = useState<MedicalProfessionalApplication | null>(null);
  const [status, setStatus] = useState("Loading professional application...");
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;
    let active = true;
    void fetch("/api/medical-professional-applications", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as { application?: MedicalProfessionalApplication | null; error?: string };
        if (!response.ok) throw new Error(result.error || "Could not load professional status.");
        if (active) {
          setApplication(result.application || null);
          setStatus(result.application ? "" : "No professional application has been submitted for this account.");
        }
      })
      .catch((error: unknown) => { if (active) setStatus(error instanceof Error ? error.message : "Could not load professional status."); });
    return () => { active = false; };
  }, [session?.user?.email]);

  async function activateStaffProfile() {
    setActivating(true);
    setStatus("Activating approved Medical Staff profile...");
    try {
      await setRole("staff");
      router.push("/staff/dashboard");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not activate Medical Staff access.");
      setActivating(false);
    }
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5" /> Medical Professional Profile</CardTitle><CardDescription>Credential details and manual-review status for this signed-in account.</CardDescription></div>
          {application ? <Badge tone={application.status === "approved" ? "green" : application.status === "rejected" ? "red" : "yellow"}>{application.status}</Badge> : null}
        </div>
      </CardHeader>
      <CardContent>
        {application ? <div className="space-y-5">
          <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md border p-3"><dt className="text-xs text-muted-foreground">Legal name</dt><dd className="font-semibold">{application.legalName}</dd></div>
            <div className="rounded-md border p-3"><dt className="text-xs text-muted-foreground">Profession</dt><dd className="font-semibold">{medicalProfessionLabels[application.profession]}</dd></div>
            <div className="rounded-md border p-3"><dt className="text-xs text-muted-foreground">Registration ID</dt><dd className="break-all font-semibold">{application.medicalRegistrationId}</dd></div>
            <div className="rounded-md border p-3"><dt className="text-xs text-muted-foreground">Licensing authority</dt><dd className="font-semibold">{application.licensingAuthority}</dd></div>
            <div className="rounded-md border p-3"><dt className="text-xs text-muted-foreground">Hospital</dt><dd className="font-semibold">{application.hospital}</dd></div>
            <div className="rounded-md border p-3"><dt className="text-xs text-muted-foreground">Department</dt><dd className="font-semibold">{application.department}</dd></div>
          </dl>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" asChild><a href={application.proofUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> Open verification evidence</a></Button>
            {application.status === "approved" && session?.user?.role !== "staff" ? <Button onClick={() => void activateStaffProfile()} disabled={activating}><BadgeCheck className="h-4 w-4" /> {activating ? "Activating..." : "Activate Medical Staff profile"}</Button> : null}
            {application.status === "approved" && session?.user?.role === "staff" ? <Button asChild><a href="/staff/dashboard">Open Medical Staff workspace</a></Button> : null}
          </div>
          {application.reviewNote ? <p className="rounded-md bg-muted p-3 text-sm"><strong>Manual review note:</strong> {application.reviewNote}</p> : null}
        </div> : <p className="text-sm text-muted-foreground">{status}</p>}
        {application && status ? <p className="mt-4 text-sm font-semibold" role="status">{status}</p> : null}
      </CardContent>
    </Card>
  );
}