"use client";

import { useEffect, useState } from "react";
import { Activity, ClipboardCheck, FileClock, RefreshCw, Search, ShieldCheck, TerminalSquare, UserCog, UsersRound } from "lucide-react";
import { MedicalApplicationReview } from "@/components/medical-application-review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminAuditEvent } from "@/lib/admin-audit-store";
import type { AdminCommandName } from "@/lib/admin-commands";
import type { MedicalProfessionalApplication } from "@/lib/medical-professional";

type AdminPerson = {
  id: string;
  name: string;
  role: string;
  email: string | null;
  access: string;
  roomId: string | null;
};

type OperationsData = {
  currentAdmin: { name: string; email: string };
  applications: MedicalProfessionalApplication[];
  people: AdminPerson[];
  auditEvents: AdminAuditEvent[];
  commands: AdminCommandName[];
};

const views = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "requests", label: "Requests", icon: ClipboardCheck },
  { id: "people", label: "People", icon: UsersRound },
  { id: "logs", label: "Audit Log", icon: FileClock },
  { id: "console", label: "Console", icon: TerminalSquare }
] as const;
type AdminView = (typeof views)[number]["id"];

function accessTone(access: string) {
  if (access === "active" || access === "approved") return "green";
  if (access === "suspended" || access === "rejected") return "red";
  if (access === "pending") return "yellow";
  return "blue";
}

export function AdminOperationsPortal() {
  const [view, setView] = useState<AdminView>("overview");
  const [data, setData] = useState<OperationsData | null>(null);
  const [status, setStatus] = useState("Loading administration data...");
  const [search, setSearch] = useState("");
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [working, setWorking] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>(["CareVoice restricted operations console", "Select an approved diagnostic command to begin."]);

  async function loadOperations() {
    const response = await fetch("/api/admin/operations", { cache: "no-store" });
    const result = await response.json() as OperationsData & { error?: string };
    if (!response.ok) throw new Error(result.error || "Could not load administration data.");
    setData(result);
    setStatus("");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadOperations().catch((error: unknown) => setStatus(error instanceof Error ? error.message : "Could not load administration data."));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function changeAccess(person: AdminPerson, access: "active" | "suspended") {
    if (!person.email) return;
    const reason = reasons[person.id]?.trim() || "";
    if (reason.length < 5) {
      setStatus("Enter an audit reason of at least five characters before changing access.");
      return;
    }
    setWorking(person.id);
    setStatus(`Updating access for ${person.name}...`);
    try {
      const response = await fetch("/api/admin/operations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountEmail: person.email, access, reason })
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not update account access.");
      await loadOperations();
      setStatus(`${person.name} is now ${access}. The change was added to the audit log.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not update account access.");
    } finally {
      setWorking("");
    }
  }

  async function runCommand(command: AdminCommandName) {
    setWorking(command);
    setConsoleOutput([`$ ${command}`, "Running read-only diagnostic..."]);
    try {
      const response = await fetch("/api/admin/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
      });
      const result = await response.json() as { output?: string[]; executedAt?: string; error?: string };
      if (!response.ok || !result.output) throw new Error(result.error || "Diagnostic failed.");
      setConsoleOutput([`$ ${command}`, ...result.output, "", `Completed ${result.executedAt}`]);
      await loadOperations();
    } catch (error) {
      setConsoleOutput([`$ ${command}`, `ERROR: ${error instanceof Error ? error.message : "Diagnostic failed."}`]);
    } finally {
      setWorking("");
    }
  }

  const normalizedSearch = search.trim().toLowerCase();
  const filteredPeople = (data?.people || []).filter((person) => !normalizedSearch || [person.name, person.role, person.email, person.roomId].some((value) => value?.toLowerCase().includes(normalizedSearch)));
  const pending = data?.applications.filter((application) => application.status === "pending").length || 0;
  const active = data?.people.filter((person) => person.access === "active" || person.access === "demo").length || 0;
  const denied = data?.applications.filter((application) => application.status === "rejected").length || 0;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-end md:justify-between">
        <div><p className="text-sm font-semibold text-primary">CareVoice Operations</p><h1 className="mt-1 text-3xl font-bold">Administration Portal</h1><p className="mt-2 text-sm text-muted-foreground">Identity review, access control, audit history, and restricted system diagnostics.</p></div>
        <div className="flex items-center gap-3 text-sm"><span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground"><ShieldCheck className="h-5 w-5" /></span><div><p className="font-semibold">{data?.currentAdmin.name || "Authorized staff"}</p><p className="text-xs text-muted-foreground">{data?.currentAdmin.email || "Session protected"}</p></div></div>
      </section>

      <nav className="flex gap-1 overflow-x-auto border-b" aria-label="Administration sections">
        {views.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold ${view === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`} aria-current={view === id ? "page" : undefined} onClick={() => setView(id)}><Icon className="h-4 w-4" />{label}{id === "requests" && pending ? <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900">{pending}</span> : null}</button>)}
      </nav>

      {status ? <div className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 p-3 text-sm" role="status"><span>{status}</span><Button size="sm" variant="ghost" onClick={() => void loadOperations()}><RefreshCw className="h-4 w-4" /> Refresh</Button></div> : null}

      {view === "overview" ? <>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card><CardHeader className="pb-2"><CardDescription>Known identities</CardDescription><CardTitle className="text-3xl">{data?.people.length || 0}</CardTitle></CardHeader><CardContent><p className="text-xs text-muted-foreground">Demo identities and submitted professional accounts</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardDescription>Pending requests</CardDescription><CardTitle className="text-3xl">{pending}</CardTitle></CardHeader><CardContent><Button size="sm" variant="outline" onClick={() => setView("requests")}>Review queue</Button></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardDescription>Active identities</CardDescription><CardTitle className="text-3xl">{active}</CardTitle></CardHeader><CardContent><p className="text-xs text-muted-foreground">Includes read-only demonstration profiles</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardDescription>Rejected / suspended</CardDescription><CardTitle className="text-3xl">{denied}</CardTitle></CardHeader><CardContent><Button size="sm" variant="outline" onClick={() => setView("people")}>Manage access</Button></CardContent></Card>
        </section>
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card><CardHeader><CardTitle>Recent Activity</CardTitle><CardDescription>Latest security and administration events.</CardDescription></CardHeader><CardContent className="space-y-3">{data?.auditEvents.slice(0, 6).map((event) => <div key={event.id} className="flex items-start justify-between gap-4 border-b pb-3 last:border-0"><div><p className="text-sm font-semibold">{event.action}</p><p className="text-xs text-muted-foreground">{event.detail}</p></div><time className="shrink-0 text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</time></div>)}{!data?.auditEvents.length ? <p className="text-sm text-muted-foreground">No administration events recorded in this process yet.</p> : null}</CardContent></Card>
          <Card><CardHeader><CardTitle>Security Posture</CardTitle><CardDescription>Current prototype safeguards.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm"><p className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Server-enforced staff session</p><p className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Account-bound professional approval</p><p className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Allowlisted diagnostics only</p><p className="flex gap-2"><FileClock className="h-4 w-4 text-amber-600" /> Process-local prototype persistence</p></CardContent></Card>
        </section>
      </> : null}

      {view === "requests" ? <MedicalApplicationReview /> : null}

      {view === "people" ? <Card><CardHeader><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><CardTitle>People and Access</CardTitle><CardDescription>Search all known identities. Professional accounts can be activated or suspended with an audit reason.</CardDescription></div><div className="relative w-full md:w-80"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, role, email, or room" /></div></div></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Person</TableHead><TableHead>Role</TableHead><TableHead>Access</TableHead><TableHead>Room / Account</TableHead><TableHead>Management</TableHead></TableRow></TableHeader><TableBody>{filteredPeople.map((person) => <TableRow key={`${person.id}-${person.email || "demo"}`}><TableCell><p className="font-semibold">{person.name}</p><p className="text-xs text-muted-foreground">{person.email || "Demonstration identity"}</p></TableCell><TableCell className="capitalize">{person.role.replace("-", " ")}</TableCell><TableCell><Badge tone={accessTone(person.access)}>{person.access}</Badge></TableCell><TableCell className="text-xs">{person.roomId || person.email || "-"}</TableCell><TableCell>{person.email ? <div className="flex min-w-[340px] gap-2"><Input value={reasons[person.id] || ""} onChange={(event) => setReasons({ ...reasons, [person.id]: event.target.value })} placeholder="Required audit reason" aria-label={`Audit reason for ${person.name}`} /><Button size="sm" variant={person.access === "active" ? "destructive" : "default"} disabled={working === person.id} onClick={() => void changeAccess(person, person.access === "active" ? "suspended" : "active")}><UserCog className="h-4 w-4" />{person.access === "active" ? "Suspend" : "Activate"}</Button></div> : <span className="text-xs text-muted-foreground">Managed by demo data source</span>}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card> : null}

      {view === "logs" ? <Card><CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle>Audit Log</CardTitle><CardDescription>Append-only administration events for this running server process.</CardDescription></div><Button size="sm" variant="outline" onClick={() => void loadOperations()}><RefreshCw className="h-4 w-4" /> Refresh</Button></div></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Time</TableHead><TableHead>Outcome</TableHead><TableHead>Action</TableHead><TableHead>Actor</TableHead><TableHead>Target</TableHead><TableHead>Detail</TableHead></TableRow></TableHeader><TableBody>{data?.auditEvents.map((event) => <TableRow key={event.id}><TableCell className="whitespace-nowrap text-xs">{new Date(event.timestamp).toLocaleString()}</TableCell><TableCell><Badge tone={event.outcome === "success" ? "green" : event.outcome === "denied" ? "red" : "blue"}>{event.outcome}</Badge></TableCell><TableCell className="font-semibold">{event.action}</TableCell><TableCell className="text-xs">{event.actor}</TableCell><TableCell className="text-xs">{event.target}</TableCell><TableCell className="min-w-64 text-xs">{event.detail}</TableCell></TableRow>)}</TableBody></Table>{!data?.auditEvents.length ? <p className="py-8 text-center text-sm text-muted-foreground">No audit events recorded yet.</p> : null}</CardContent></Card> : null}

      {view === "console" ? <Card><CardHeader><CardTitle>Restricted Operations Console</CardTitle><CardDescription>These are named, read-only diagnostics. Raw terminal input and arbitrary shell execution are intentionally unavailable.</CardDescription></CardHeader><CardContent className="grid gap-5 lg:grid-cols-[260px_1fr]"><div className="space-y-2">{data?.commands.map((command) => <Button key={command} className="w-full justify-start font-mono text-xs" variant="outline" disabled={working === command} onClick={() => void runCommand(command)}><TerminalSquare className="h-4 w-4" />{command}</Button>)}</div><pre className="min-h-72 overflow-auto rounded-md bg-[#101713] p-5 font-mono text-xs leading-6 text-[#b9f6ca]" aria-live="polite">{consoleOutput.join("\n")}</pre></CardContent></Card> : null}
    </div>
  );
}