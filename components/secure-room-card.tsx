"use client";

import Link from "next/link";
import { LockKeyhole, QrCode, ShieldCheck, UsersRound } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { secureCareRoom } from "@/lib/mock-data";

type SecureRoomCardProps = {
  audience: "patient" | "family" | "staff";
};

const audienceCopy = {
  patient: "Your CareVoice room connects your assigned nurse, doctor, and approved family member.",
  family: "Join the approved family portal for visits, updates, and emergency communication.",
  staff: "Generate short-lived signed room invites for assigned nurses, doctors, and family members."
};

export function SecureRoomCard({ audience }: SecureRoomCardProps) {
  const [invitePath, setInvitePath] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [isCreatingInvite, setIsCreatingInvite] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientRole, setRecipientRole] = useState<"patient" | "family" | "staff">("family");

  async function createInvite() {
    setInviteError("");
    setIsCreatingInvite(true);
    try {
      const response = await fetch("/api/room-invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientEmail, role: recipientRole })
      });
      const result = await response.json() as { invitePath?: string; error?: string };
      if (!response.ok || !result.invitePath) throw new Error(result.error || "Could not create invite.");
      setInvitePath(result.invitePath);
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : "Could not create invite.");
    } finally {
      setIsCreatingInvite(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardDescription>CareVoice Secure Room</CardDescription>
            <CardTitle>{secureCareRoom.patient}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">{audienceCopy[audience]}</p>
          </div>
          <Badge tone="green"><ShieldCheck className="mr-1 h-3 w-3" /> Signed invite</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="rounded-lg border bg-muted/40 p-4 text-center">
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-md border bg-white">
            <QrCode className="h-28 w-28 text-primary" />
          </div>
          {audience === "staff" ? (
            invitePath ? (
              <Button className="mt-3 w-full" asChild><Link href={invitePath}>Open 10-minute invite</Link></Button>
            ) : (
              <div className="mt-3 space-y-2 text-left">
                <Input type="email" value={recipientEmail} onChange={(event) => setRecipientEmail(event.target.value)} placeholder="Recipient email" aria-label="Room invite recipient email" />
                <select value={recipientRole} onChange={(event) => setRecipientRole(event.target.value as typeof recipientRole)} className="h-10 w-full rounded-md border bg-background px-3 text-sm" aria-label="Room invite role">
                  <option value="patient">Patient</option>
                  <option value="family">Family member</option>
                  <option value="staff">Medical staff</option>
                </select>
                <Button className="w-full" onClick={() => void createInvite()} disabled={isCreatingInvite || !recipientEmail.trim()}>
                  {isCreatingInvite ? "Creating..." : "Create signed invite"}
                </Button>
              </div>
            )
          ) : <p className="mt-3 text-xs text-muted-foreground">Ask authorized staff for a short-lived room invitation.</p>}
          {inviteError ? <p className="mt-2 text-xs font-medium text-red-700">{inviteError}</p> : null}
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            {secureCareRoom.assignedTeam.map((person) => (
              <div key={person.name} className="rounded-lg border p-3">
                <p className="text-sm font-semibold">{person.name}</p>
                <p className="text-xs text-primary">{person.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{person.access}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="flex items-center gap-2 font-semibold"><LockKeyhole className="h-4 w-4 text-primary" /> Privacy and access</p>
            <p className="mt-2 text-sm text-muted-foreground">{secureCareRoom.encryption}</p>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            {secureCareRoom.privacyRules.map((rule) => <p key={rule} className="flex gap-2"><UsersRound className="mt-0.5 h-4 w-4 text-primary" /> {rule}</p>)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}