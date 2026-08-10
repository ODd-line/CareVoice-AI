"use client";

import { Copy, LockKeyhole, Mail, QrCode, RefreshCw, Share2, ShieldCheck, UsersRound } from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RoomQrEntry } from "@/components/room-qr-entry";
import { secureCareRoom } from "@/lib/mock-data";
import type { RoomMemberRole } from "@/lib/room-access";

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
  const [roomRole, setRoomRole] = useState<RoomMemberRole>("family");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const inviteUrl = invitePath && typeof window !== "undefined" ? `${window.location.origin}${invitePath}` : "";

  async function createInvite() {
    setInviteError("");
    setDeliveryStatus("");
    setIsCreatingInvite(true);
    try {
      const response = await fetch("/api/room-invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientEmail, roomRole })
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

  async function shareInvite() {
    if (!inviteUrl) return;
    const shareData = {
      title: "CareVoice secure room invitation",
      text: `A ${roomRole} invitation for ${secureCareRoom.patient}. It expires ten minutes after issue and works only for ${recipientEmail}.`,
      url: inviteUrl
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setDeliveryStatus("Invite shared from this device.");
        return;
      }
      await navigator.clipboard.writeText(inviteUrl);
      setDeliveryStatus("Signed invite copied. Send it only to the named recipient.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setDeliveryStatus("Could not open sharing. Use Email invite or Copy link instead.");
    }
  }

  async function copyInvite() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setDeliveryStatus("Signed invite link copied.");
    } catch {
      setDeliveryStatus("Copy failed. Use the addressed email action instead.");
    }
  }

  function resetInvite() {
    setInvitePath("");
    setDeliveryStatus("");
    setInviteError("");
    setRecipientEmail("");
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
            {inviteUrl ? <QRCodeSVG value={inviteUrl} size={136} level="M" marginSize={1} /> : <QrCode className="h-28 w-28 text-primary" />}
          </div>
          {audience === "staff" ? (
            invitePath ? (
              <div className="mt-3 space-y-2 text-left">
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950">
                  <p className="font-bold">Real signed QR ready</p>
                  <p className="mt-1 break-all">For {recipientEmail} · {roomRole} · expires in 10 minutes</p>
                </div>
                <Button className="w-full" type="button" onClick={() => void shareInvite()}><Share2 className="h-4 w-4" /> Send room invite</Button>
                <Button className="w-full" type="button" variant="outline" asChild><a href={`mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent("CareVoice secure room invitation")}&body=${encodeURIComponent(`You have been invited to the ${secureCareRoom.patient} CareVoice room as ${roomRole}. This signed link expires ten minutes after issue and works only with your invited account:\n\n${inviteUrl}`)}`}><Mail className="h-4 w-4" /> Email invite</a></Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant="outline" onClick={() => void copyInvite()}><Copy className="h-4 w-4" /> Copy link</Button>
                  <Button type="button" variant="outline" onClick={resetInvite}><RefreshCw className="h-4 w-4" /> New invite</Button>
                </div>
                {deliveryStatus ? <p className="text-xs text-muted-foreground" role="status">{deliveryStatus}</p> : null}
              </div>
            ) : (
              <div className="mt-3 space-y-2 text-left">
                <Input type="email" value={recipientEmail} onChange={(event) => setRecipientEmail(event.target.value)} placeholder="Recipient email" aria-label="Room invite recipient email" />
                <select value={roomRole} onChange={(event) => setRoomRole(event.target.value as RoomMemberRole)} className="h-10 w-full rounded-md border bg-background px-3 text-sm" aria-label="Room invite role">
                  <option value="patient">Patient</option>
                  <option value="family">Family member</option>
                  <option value="doctor">Doctor</option>
                  <option value="hospital">Hospital team</option>
                </select>
                <Button className="w-full" onClick={() => void createInvite()} disabled={isCreatingInvite || !recipientEmail.trim()}>
                  {isCreatingInvite ? "Issuing..." : "Issue recipient QR invite"}
                </Button>
                <p className="text-xs text-muted-foreground">The QR will contain a server-signed room link tied to this email and role, not a reusable public room code.</p>
              </div>
            )
          ) : <p className="mt-3 text-xs text-muted-foreground">Ask an authorized doctor or hospital team for a short-lived room invitation.</p>}
          {inviteError ? <p className="mt-2 text-xs font-medium text-red-700">{inviteError}</p> : null}
          <div className="mt-3"><RoomQrEntry /></div>
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