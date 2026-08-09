import { Activity, HeartPulse, Mic, PhoneCall, Pill, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyCalendarPanel } from "@/components/lazy-calendar-panel";
import { SecureRoomCard } from "@/components/secure-room-card";
import { patientCalendarEvents, patientSchedule } from "@/lib/mock-data";

const scheduleIcons = { pill: Pill, activity: Activity, heart: HeartPulse, phone: Video } as const;

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-2 border-primary bg-white">
          <CardContent className="flex min-h-[360px] flex-col items-center justify-center gap-6 p-8 text-center">
            <Button className="h-48 w-48 rounded-full text-3xl shadow-xl md:h-64 md:w-64" aria-label="Open voice assistant" asChild>
              <Link href="/patient/voice-assistant">
              <span className="flex flex-col items-center gap-4">
                <Mic className="h-16 w-16" /> Tap to Speak
              </span>
              </Link>
            </Button>
            <div>
              <h2 className="text-4xl font-bold">How are you feeling today?</h2>
              <p className="mt-3 text-2xl text-muted-foreground">Press the button and tell CareVoice what you need.</p>
            </div>
            <Button size="lg" variant="destructive" className="min-h-16 px-8 text-2xl">
              <PhoneCall className="h-7 w-7" /> Call for Help
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Today&apos;s Timetable</CardTitle>
            <CardDescription className="text-lg">Large cards for medicine, therapy, meals, and family calls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {patientSchedule.map((item) => {
              const Icon = scheduleIcons[item.icon as keyof typeof scheduleIcons];
              return (
                <div key={`${item.time}-${item.task}`} className="flex items-center gap-4 rounded-lg border bg-secondary/70 p-5">
                  <div className="grid h-16 w-16 place-items-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{item.time}</p>
                    <p className="text-2xl font-semibold">{item.task}</p>
                    <p className="text-lg text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
      <SecureRoomCard audience="patient" />
      <LazyCalendarPanel title="My Calendar" description="Medicine, therapy, family visits, and hospital appointments in one simple calendar." events={patientCalendarEvents} />
    </div>
  );
}