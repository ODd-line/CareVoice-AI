import { ArrowDownUp, ClipboardPlus, FileCheck2, Hospital, Languages, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LazyCalendarPanel } from "@/components/lazy-calendar-panel";
import { SecureRoomCard } from "@/components/secure-room-card";
import { hospitalOpsMetrics, hospitalWorkflowGaps, staffCalendarEvents, triagePatients } from "@/lib/mock-data";

function urgencyTone(urgency: string) {
  if (urgency === "Red") return "red";
  if (urgency === "Yellow") return "yellow";
  return "green";
}

export default function StaffDashboardPage() {
  const sortedPatients = [...triagePatients].sort((a, b) => b.score - a.score);
  const metricIcons = [Hospital, FileCheck2, UsersRound, Languages];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Hospital operations gaps">
        {hospitalOpsMetrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <Card key={metric.label}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardDescription>{metric.label}</CardDescription>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{metric.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Triage Queue</CardTitle>
            <CardDescription>Patients ranked by AI urgency for rapid clinical review.</CardDescription>
          </div>
          <Button variant="outline"><ArrowDownUp className="h-4 w-4" /> Sort by Urgency</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>AI Reason</TableHead>
                <TableHead>Last Check-in</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPatients.map((patient) => (
                <TableRow key={patient.name}>
                  <TableCell className="font-semibold">{patient.name}<span className="block text-xs text-muted-foreground">Age {patient.age}</span></TableCell>
                  <TableCell><Badge tone={urgencyTone(patient.urgency)}>{patient.urgency}</Badge></TableCell>
                  <TableCell>{patient.reason}</TableCell>
                  <TableCell>{patient.lastCheckIn}</TableCell>
                  <TableCell>{patient.score}</TableCell>
                  <TableCell className="text-right"><Button size="sm"><ClipboardPlus className="h-4 w-4" /> Open</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <SecureRoomCard audience="staff" />
      <Card>
        <CardHeader>
          <CardTitle>Hospital Workflow Gaps</CardTitle>
          <CardDescription>CareVoice surfaces operational gaps most hospital apps leave buried across spreadsheets, phone calls, and paper notes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {hospitalWorkflowGaps.map((gap) => (
            <div key={gap.title} className="rounded-lg border bg-muted/40 p-4">
              <h3 className="font-semibold">{gap.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{gap.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <LazyCalendarPanel title="Clinical Calendar" description="Staff shifts, surgery prep, post-op checks, and discharge handoff slots." events={staffCalendarEvents} />
    </div>
  );
}