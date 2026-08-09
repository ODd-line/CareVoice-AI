"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { Save } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockProfile } from "@/lib/mock-data";
import { roleHome, roleLabels, type UserRole } from "@/lib/roles";
import { useCareVoiceProfile } from "@/components/role-provider";

const roleOptions: UserRole[] = ["patient", "family", "staff"];

export default function ProfilePage() {
  const { data: session } = useSession();
  const { profile, setProfile } = useCareVoiceProfile();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const user = session?.user;
  const name = user?.name || mockProfile.name;
  const email = user?.email || mockProfile.email;
  const image = user?.image || mockProfile.image;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError("");
    setSaved(false);
    try {
      await setProfile(draft);
      setSaved(true);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save this profile.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader className="items-center text-center">
          <Avatar src={image} name={name} size={144} />
          <div>
            <CardTitle className="mt-4 text-3xl">{name}</CardTitle>
            <CardDescription className="text-base">{email}</CardDescription>
          </div>
          <Badge tone="blue">{roleLabels[profile.role]}</Badge>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Google profile picture, name, and email come from NextAuth when Google Provider is configured.</p>
          <p>CareVoice profile fields are stored locally as mock data now, with a clean path to persist them in your database later.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Edit role, phone number, emergency contacts, and linked patient details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={draft.role}
                onChange={(event) => setDraft({ ...draft, role: event.target.value as UserRole })}
                className="h-11 rounded-md border bg-background px-3 text-sm"
              >
                {roleOptions.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input id="emergencyContact" value={draft.emergencyContact} onChange={(event) => setDraft({ ...draft, emergencyContact: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedPatient">Linked Patient</Label>
              <Input id="linkedPatient" value={draft.linkedPatient} onChange={(event) => setDraft({ ...draft, linkedPatient: event.target.value })} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit"><Save className="h-4 w-4" /> Save Profile</Button>
              <Button type="button" variant="outline" onClick={() => { window.location.href = roleHome[profile.role]; }}>Open Role Workspace</Button>
              {saved ? <span className="text-sm font-medium text-emerald-700">Profile saved for this account.</span> : null}
              {saveError ? <span className="text-sm font-medium text-red-700">{saveError}</span> : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}