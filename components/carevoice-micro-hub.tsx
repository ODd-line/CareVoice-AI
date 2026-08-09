"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BellRing,
  Bot,
  Check,
  CircleHelp,
  Gamepad2,
  Heart,
  House,
  MessageCircle,
  Pill,
  Radio,
  RefreshCw,
  ShieldCheck,
  UserRound,
  UsersRound,
  Wifi,
  WifiOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type HubMode = "home" | "medication" | "nurse" | "family" | "games";
type MedicationState = "due" | "taken" | "review";
type NurseState = "idle" | "sent" | "acknowledged";

type AuditEvent = {
  id: number;
  label: string;
  detail: string;
  tone: "green" | "yellow" | "red" | "blue";
};

const gameCards = ["Pill", "Heart", "Family", "Heart", "Family", "Pill"];

const controls = [
  { mode: "home" as const, label: "HOME", detail: "Accessible overview", icon: House, className: "bg-zinc-100" },
  { mode: "medication" as const, label: "MEDS", detail: "Verified reminder", icon: Pill, className: "bg-amber-100" },
  { mode: "nurse" as const, label: "NURSE", detail: "Bedside request", icon: BellRing, className: "bg-red-100" },
  { mode: "family" as const, label: "FAMILY", detail: "Approved contact", icon: UsersRound, className: "bg-blue-100" },
  { mode: "games" as const, label: "GAMES", detail: "Social activity", icon: Gamepad2, className: "bg-violet-100" }
];

const gameIcons = {
  Pill,
  Heart,
  Family: UsersRound
};

export function CareVoiceMicroHub() {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [mode, setMode] = useState<HubMode>("home");
  const [medicationState, setMedicationState] = useState<MedicationState>("due");
  const [nurseState, setNurseState] = useState<NurseState>("idle");
  const [online, setOnline] = useState(true);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  function addEvent(label: string, detail: string, tone: AuditEvent["tone"]) {
    setEvents((current) => [{ id: Date.now(), label, detail, tone }, ...current].slice(0, 8));
  }

  function loadProfile() {
    setProfileLoaded(true);
    addEvent("Profile verified", "Mei Wong · Cantonese voice · high contrast · volume 70%", "green");
  }

  function chooseMode(nextMode: HubMode) {
    if (!profileLoaded) {
      addEvent("Control blocked", "Tap the NFC profile card before using bedside controls.", "yellow");
      return;
    }
    setMode(nextMode);
  }

  function confirmMedication(nextState: MedicationState) {
    setMedicationState(nextState);
    if (nextState === "taken") addEvent("Medication confirmed", "8:00 AM blue pill marked taken by physical YES response.", "green");
    if (nextState === "review") addEvent("Medication review requested", "Dose was not changed. Assigned nurse review added to queue.", "yellow");
  }

  function sendNurseRequest() {
    setNurseState("sent");
    addEvent("Nurse request sent", online ? "Ward hub received a non-emergency bedside request." : "Stored locally; ward hub will receive it when the link returns.", "red");
  }

  function acknowledgeNurseRequest() {
    setNurseState("acknowledged");
    addEvent("Request acknowledged", "Nurse Lee accepted the request. Estimated arrival: 3 minutes.", "green");
  }

  function toggleNetwork() {
    setOnline((current) => {
      const next = !current;
      addEvent(next ? "Connection restored" : "Connection interrupted", next ? "Queued events synchronized with the ward hub." : "Essential controls remain available through the local queue.", next ? "green" : "yellow");
      return next;
    });
  }

  function chooseGameCard(index: number) {
    if (openCards.length === 2 || openCards.includes(index) || matchedCards.includes(index)) return;
    const nextOpen = [...openCards, index];
    setOpenCards(nextOpen);
    if (nextOpen.length < 2) return;
    setMoves((current) => current + 1);
    if (gameCards[nextOpen[0]] === gameCards[nextOpen[1]]) {
      setMatchedCards((current) => [...current, ...nextOpen]);
      setOpenCards([]);
      if (matchedCards.length === gameCards.length - 2) addEvent("Game completed", "Memory match completed. Social activity recorded without health scoring.", "blue");
      return;
    }
    window.setTimeout(() => setOpenCards([]), 650);
  }

  function resetGame() {
    setOpenCards([]);
    setMatchedCards([]);
    setMoves(0);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border bg-[#222926] text-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-emerald-300">CareVoice Micro · Live control hub</p>
                <h1 className="mt-2 text-3xl font-bold md:text-5xl">One touch. One clear care action.</h1>
              </div>
              <Badge tone={online ? "green" : "yellow"}>{online ? "Ward hub online" : "Local recovery mode"}</Badge>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">This is the working bedside flow behind the physical controller: load an accessibility profile, use one bounded control, receive multimodal confirmation, and leave an auditable handoff.</p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {controls.map(({ mode: controlMode, label, detail, icon: Icon, className }) => (
                <button key={controlMode} type="button" onClick={() => chooseMode(controlMode)} className={`min-h-28 rounded-md border border-white/15 p-3 text-left text-zinc-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${className} ${mode === controlMode ? "ring-2 ring-emerald-400" : ""}`}>
                  <Icon className="h-6 w-6" />
                  <strong className="mt-5 block text-sm">{label}</strong>
                  <span className="mt-1 block text-[11px] leading-4 opacity-70">{detail}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/15 bg-black/15 p-6 md:p-8 xl:border-l xl:border-t-0">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-emerald-300 text-zinc-900"><UserRound /></div>
              <div><p className="text-xs font-bold uppercase text-zinc-400">NFC / QR profile</p><h2 className="text-xl font-bold">{profileLoaded ? "Mei Wong loaded" : "No patient loaded"}</h2></div>
            </div>
            {profileLoaded ? (
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="border-t border-white/15 pt-3"><dt className="text-zinc-400">Prompt language</dt><dd className="font-bold">Cantonese / English</dd></div>
                <div className="border-t border-white/15 pt-3"><dt className="text-zinc-400">Display</dt><dd className="font-bold">High contrast</dd></div>
                <div className="border-t border-white/15 pt-3"><dt className="text-zinc-400">Input</dt><dd className="font-bold">Long-press guard</dd></div>
                <div className="border-t border-white/15 pt-3"><dt className="text-zinc-400">Family consent</dt><dd className="font-bold">Approved</dd></div>
              </dl>
            ) : <p className="mt-5 text-sm leading-6 text-zinc-300">Simulate tapping the patient&apos;s NFC card. Controls stay locked until identity and accessibility preferences are confirmed.</p>}
            <Button className="mt-6 w-full" variant={profileLoaded ? "outline" : "default"} onClick={loadProfile}><Radio className="h-4 w-4" /> {profileLoaded ? "Reload profile card" : "Tap NFC profile card"}</Button>
            <Button className="mt-2 w-full border-white/20 text-white hover:bg-white/10 hover:text-white" variant="outline" onClick={toggleNetwork}>{online ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />} {online ? "Test network loss" : "Restore connection"}</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="min-h-[430px]">
          <CardHeader>
            <CardDescription>Selected physical workflow</CardDescription>
            <CardTitle className="text-3xl">{mode === "home" ? "Accessible home" : mode === "medication" ? "Medication confirmation" : mode === "nurse" ? "Nurse request" : mode === "family" ? "Family connection" : "Social games"}</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "home" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <Button asChild className="min-h-28 justify-start px-6 text-xl"><Link href="/patient/voice-assistant"><Bot className="h-8 w-8" /> Talk to CareVoice AI</Link></Button>
                <Button variant="outline" onClick={() => chooseMode("medication")} className="min-h-28 justify-start px-6 text-xl"><Pill className="h-8 w-8" /> Review medication</Button>
                <Button variant="outline" onClick={() => chooseMode("family")} className="min-h-28 justify-start px-6 text-xl"><UsersRound className="h-8 w-8" /> Contact family</Button>
                <Button variant="destructive" onClick={() => chooseMode("nurse")} className="min-h-28 justify-start px-6 text-xl"><BellRing className="h-8 w-8" /> Request nurse</Button>
              </div>
            ) : null}

            {mode === "medication" ? (
              <div className="space-y-5">
                <div className="rounded-md border border-amber-300 bg-amber-50 p-5"><p className="text-sm font-bold text-amber-800">Staff-approved reminder · 8:00 AM</p><h3 className="mt-2 text-2xl font-bold">Blue blood-pressure pill</h3><p className="mt-2 text-muted-foreground">Take one tablet with warm water. This interface cannot change the prescribed dose.</p></div>
                <div className="grid gap-3 sm:grid-cols-2"><Button className="min-h-20 text-lg" onClick={() => confirmMedication("taken")}><Check className="h-6 w-6" /> Yes, taken</Button><Button className="min-h-20 text-lg" variant="outline" onClick={() => confirmMedication("review")}><CircleHelp className="h-6 w-6" /> I need help</Button></div>
                <p className="text-sm font-semibold" aria-live="polite">{medicationState === "due" ? "Waiting for a physical YES or help response." : medicationState === "taken" ? "Confirmed. Family will not receive a missed-dose alert." : "Dose unchanged. A nurse review has been added."}</p>
              </div>
            ) : null}

            {mode === "nurse" ? (
              <div className="space-y-5">
                <div className="rounded-md border bg-red-50 p-5"><p className="text-sm font-bold text-red-800">Non-emergency bedside assistance</p><h3 className="mt-2 text-2xl font-bold">Need help getting out of bed?</h3><p className="mt-2 text-muted-foreground">The ward receives patient, bed, request type, and timestamp. For immediate danger, call emergency services directly.</p></div>
                {nurseState === "idle" ? <Button variant="destructive" className="min-h-20 w-full text-lg" onClick={sendNurseRequest}><BellRing className="h-6 w-6" /> Send nurse request</Button> : null}
                {nurseState === "sent" ? <div className="grid gap-3 sm:grid-cols-2"><Button className="min-h-20 text-lg" onClick={acknowledgeNurseRequest}><ShieldCheck className="h-6 w-6" /> Simulate staff acknowledgement</Button><Button variant="destructive" className="min-h-20 text-lg" onClick={() => addEvent("Request escalated", "No acknowledgement within the demo SLA; charge nurse notified.", "red")}><BellRing className="h-6 w-6" /> Test timeout escalation</Button></div> : null}
                {nurseState === "acknowledged" ? <div className="rounded-md border border-emerald-300 bg-emerald-50 p-5"><p className="font-bold text-emerald-900">Nurse Lee acknowledged · ETA 3 minutes</p><p className="mt-1 text-sm text-emerald-800">The controller would confirm with green light, sound, and vibration.</p></div> : null}
              </div>
            ) : null}

            {mode === "family" ? (
              <div className="space-y-5">
                <div className="rounded-md border bg-blue-50 p-5"><p className="text-sm font-bold text-blue-800">Approved family contact</p><h3 className="mt-2 text-2xl font-bold">Daniel Chan · Son</h3><p className="mt-2 text-muted-foreground">Family access is limited to approved summaries, visits, messages, and alerts.</p></div>
                <div className="grid gap-3 sm:grid-cols-2"><Button className="min-h-20 text-lg" onClick={() => addEvent("Family call started", "Approved video call opened with Daniel Chan.", "blue")}><UsersRound className="h-6 w-6" /> Start family call</Button><Button variant="outline" className="min-h-20 text-lg" onClick={() => addEvent("Voice note shared", "Patient voice note sent to the approved family room.", "blue")}><MessageCircle className="h-6 w-6" /> Send voice note</Button></div>
              </div>
            ) : null}

            {mode === "games" ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold">Care Match</p><p className="text-sm text-muted-foreground">A simple joystick-friendly memory activity. No health score or diagnosis.</p></div><Button variant="outline" size="sm" onClick={resetGame}><RefreshCw className="h-4 w-4" /> Reset · {moves} moves</Button></div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {gameCards.map((card, index) => {
                    const Icon = gameIcons[card as keyof typeof gameIcons];
                    const isVisible = openCards.includes(index) || matchedCards.includes(index);
                    return <button key={`${card}-${index}`} type="button" onClick={() => chooseGameCard(index)} className={`grid aspect-square place-items-center rounded-md border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isVisible ? "bg-violet-100" : "bg-zinc-800 text-white"}`} aria-label={isVisible ? card : `Hidden card ${index + 1}`}><span>{isVisible ? <><Icon className="mx-auto h-8 w-8" /><strong className="mt-2 block text-xs">{card}</strong></> : <Gamepad2 className="h-8 w-8" />}</span></button>;
                  })}
                </div>
                {matchedCards.length === gameCards.length ? <p className="mt-4 rounded-md bg-emerald-50 p-3 font-bold text-emerald-900">All pairs matched. Activity complete.</p> : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardDescription>Accountable handoff</CardDescription><CardTitle>Device audit timeline</CardTitle></CardHeader>
          <CardContent>
            {events.length ? <ol className="space-y-3">{events.map((event) => <li key={event.id} className="border-l-2 border-primary pl-3"><div className="flex items-center justify-between gap-2"><p className="text-sm font-bold">{event.label}</p><Badge tone={event.tone}>{event.tone}</Badge></div><p className="mt-1 text-xs leading-5 text-muted-foreground">{event.detail}</p></li>)}</ol> : <div className="rounded-md border border-dashed p-5 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" /><p className="mt-3 text-sm font-bold">No actions yet</p><p className="mt-1 text-xs text-muted-foreground">Load a profile and test a physical workflow.</p></div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}