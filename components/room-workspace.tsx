"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CalendarPlus, Clock3, Save, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RoomCapabilities, RoomMemberRole } from "@/lib/room-access";
import type { RoomScheduleEntry } from "@/lib/room-schedule-store";

type RoomWorkspaceProps = {
  roomId: string;
  token: string;
  roomRole: RoomMemberRole;
  capabilities: RoomCapabilities;
  members: Array<{ name: string; role: string; access: string }>;
};

const roomRoleLabels: Record<RoomMemberRole, string> = {
  patient: "Patient",
  family: "Family Member",
  doctor: "Doctor",
  hospital: "Hospital Team"
};

function localDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

async function fetchRoomSchedule(roomId: string, token: string) {
  const response = await fetch(`/api/rooms/${encodeURIComponent(roomId)}/schedule?token=${encodeURIComponent(token)}`);
  const result = await response.json() as { entries?: RoomScheduleEntry[]; error?: string };
  if (!response.ok || !result.entries) throw new Error(result.error || "Could not load the shared timetable.");
  return result.entries;
}

export function RoomWorkspace({ roomId, token, roomRole, capabilities, members }: RoomWorkspaceProps) {
  const [entries, setEntries] = useState<RoomScheduleEntry[]>([]);
  const [status, setStatus] = useState("Loading shared timetable...");
  const [appointment, setAppointment] = useState({ title: "Clinic appointment request", start: "", end: "" });
  const clinicalEntries = entries.filter((entry) => entry.kind === "clinical");
  const [selectedEntryId, setSelectedEntryId] = useState("");
  const selectedEntry = clinicalEntries.find((entry) => entry.id === selectedEntryId) || clinicalEntries[0];
  const [doctorDraft, setDoctorDraft] = useState({ title: "", start: "", end: "" });

  async function refreshSchedule() {
    try {
      const nextEntries = await fetchRoomSchedule(roomId, token);
      setEntries(nextEntries);
      const firstClinicalEntry = nextEntries.find((entry) => entry.kind === "clinical");
      if (firstClinicalEntry) {
        setSelectedEntryId(firstClinicalEntry.id);
        setDoctorDraft({ title: firstClinicalEntry.title, start: localDateTime(firstClinicalEntry.start), end: localDateTime(firstClinicalEntry.end) });
      }
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load the shared timetable.");
    }
  }

  useEffect(() => {
    let active = true;
    void fetchRoomSchedule(roomId, token)
      .then((nextEntries) => { if (active) {
        setEntries(nextEntries);
        const firstClinicalEntry = nextEntries.find((entry) => entry.kind === "clinical");
        if (firstClinicalEntry) {
          setSelectedEntryId(firstClinicalEntry.id);
          setDoctorDraft({ title: firstClinicalEntry.title, start: localDateTime(firstClinicalEntry.start), end: localDateTime(firstClinicalEntry.end) });
        }
        setStatus("");
      } })
      .catch((error: unknown) => { if (active) setStatus(error instanceof Error ? error.message : "Could not load the shared timetable."); });
    return () => { active = false; };
  }, [roomId, token]);

  async function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting appointment request...");
    const response = await fetch(`/api/rooms/${encodeURIComponent(roomId)}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, ...appointment })
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) {
      setStatus(result.error || "Could not request the appointment.");
      return;
    }
    setStatus("Appointment requested. The doctor can review it before confirmation.");
    await refreshSchedule();
  }

  async function updateTimetable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedEntry) return;
    setStatus("Updating clinical timetable...");
    const response = await fetch(`/api/rooms/${encodeURIComponent(roomId)}/schedule`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, entryId: selectedEntry.id, ...doctorDraft })
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) {
      setStatus(result.error || "Could not update the timetable.");
      return;
    }
    setStatus("Clinical timetable updated by the assigned doctor.");
    await refreshSchedule();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm text-muted-foreground">Signed room member</p><h2 className="text-2xl font-bold">{roomRoleLabels[roomRole]}</h2></div>
        <Badge tone="green">Room-scoped access</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><UsersRound className="h-5 w-5" /> Same care room</CardTitle><CardDescription>Patient, approved family, assigned doctor, and hospital team share this room with different permissions.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{members.map((member) => <div key={`${member.role}-${member.name}`} className="rounded-md border p-3"><p className="font-semibold">{member.name}</p><p className="text-xs font-semibold text-primary">{member.role}</p><p className="mt-2 text-xs text-muted-foreground">{member.access}</p></div>)}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Clock3 className="h-5 w-5" /> Shared timetable</CardTitle><CardDescription>Only the assigned doctor can alter confirmed clinical items. Appointment requests remain visibly pending.</CardDescription></CardHeader>
        <CardContent className="space-y-3">{entries.map((entry) => <div key={entry.id} className="flex flex-col gap-2 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{entry.title}</p><p className="text-sm text-muted-foreground">{new Date(entry.start).toLocaleString()} – {new Date(entry.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p></div><Badge tone={entry.status === "confirmed" ? "green" : "yellow"}>{entry.status}</Badge></div>)}</CardContent>
      </Card>

      {capabilities.scheduleAppointments && !capabilities.modifyTimetable ? <Card><CardHeader><CardTitle>Request an appointment</CardTitle><CardDescription>Family can propose a time. It does not change the clinical timetable until reviewed.</CardDescription></CardHeader><CardContent><form className="grid gap-4 md:grid-cols-3" onSubmit={(event) => void submitAppointment(event)}><div className="grid gap-2"><Label htmlFor="appointment-title">Reason</Label><Input id="appointment-title" value={appointment.title} onChange={(event) => setAppointment({ ...appointment, title: event.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="appointment-start">Start</Label><Input id="appointment-start" type="datetime-local" value={appointment.start} onChange={(event) => setAppointment({ ...appointment, start: event.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="appointment-end">End</Label><Input id="appointment-end" type="datetime-local" value={appointment.end} onChange={(event) => setAppointment({ ...appointment, end: event.target.value })} required /></div><Button className="md:col-span-3 md:justify-self-start" type="submit"><CalendarPlus className="h-4 w-4" /> Request appointment</Button></form></CardContent></Card> : null}

      {capabilities.modifyTimetable && selectedEntry ? <Card><CardHeader><CardTitle>Doctor timetable controls</CardTitle><CardDescription>This server-protected action is unavailable to family, patient, and hospital-team roles.</CardDescription></CardHeader><CardContent><form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => void updateTimetable(event)}><div className="grid gap-2 md:col-span-2"><Label htmlFor="clinical-entry">Clinical item</Label><select id="clinical-entry" className="h-11 rounded-md border bg-background px-3" value={selectedEntry.id} onChange={(event) => setSelectedEntryId(event.target.value)}>{clinicalEntries.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></div><div className="grid gap-2 md:col-span-2"><Label htmlFor="clinical-title">Title</Label><Input id="clinical-title" value={doctorDraft.title} onChange={(event) => setDoctorDraft({ ...doctorDraft, title: event.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="clinical-start">Start</Label><Input id="clinical-start" type="datetime-local" value={doctorDraft.start} onChange={(event) => setDoctorDraft({ ...doctorDraft, start: event.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="clinical-end">End</Label><Input id="clinical-end" type="datetime-local" value={doctorDraft.end} onChange={(event) => setDoctorDraft({ ...doctorDraft, end: event.target.value })} required /></div><Button className="md:col-span-2 md:justify-self-start" type="submit"><Save className="h-4 w-4" /> Update timetable</Button></form></CardContent></Card> : null}

      {status ? <p className="rounded-md bg-muted p-3 text-sm" role="status">{status}</p> : null}
    </div>
  );
}