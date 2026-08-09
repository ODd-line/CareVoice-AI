import { BellRing, MessageSquareText, SmilePlus, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyCalendarPanel } from "@/components/lazy-calendar-panel";
import { SecureRoomCard } from "@/components/secure-room-card";
import { familyAlerts, familyCalendarEvents } from "@/lib/mock-data";

export default function FamilyDashboardPage() {
  return (
    <div className="space-y-6">
      <SecureRoomCard audience="family" />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserRoundCheck className="h-5 w-5 text-primary" /> Patient Status</CardTitle>
            <CardDescription>Real-time snapshot of the linked elderly patient.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Last voice check-in</p><p className="text-2xl font-bold">2 hours ago</p></div>
            <div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Mood</p><p className="flex items-center gap-2 text-2xl font-bold"><SmilePlus className="h-6 w-6 text-emerald-600" /> Happy</p></div>
            <div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Medication</p><p className="text-2xl font-bold">1 missed</p></div>
            <div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Next visit</p><p className="text-2xl font-bold">6:00 PM</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5 text-primary" /> Alerts Panel</CardTitle>
            <CardDescription>Urgent notifications from voice and timetable monitoring.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {familyAlerts.map((alert) => (
              <div key={alert.title} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-semibold">{alert.title}</p>
                  <Badge tone={alert.level === "urgent" ? "red" : alert.level === "watch" ? "yellow" : "green"}>{alert.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        </div>
        <div className="space-y-6">
          <LazyCalendarPanel title="Shared Family Calendar" description="Patient schedule, hospital follow-ups, and family visit windows." events={familyCalendarEvents} />
          <Button size="lg" className="w-full"><MessageSquareText className="h-5 w-5" /> Send Family Visit Time</Button>
        </div>
      </div>
    </div>
  );
}