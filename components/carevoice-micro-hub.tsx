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
import { Input } from "@/components/ui/input";
import { getAccessProfile, type AccessProfile } from "@/lib/access-profiles";

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

type NdefRecord = { data?: DataView };
type NdefReadingEvent = Event & { message: { records: NdefRecord[] } };
type NdefReader = EventTarget & { scan: () => Promise<void> };
type NdefReaderConstructor = new () => NdefReader;

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
  const [profile, setProfile] = useState<AccessProfile | null>(null);
  const [profileId, setProfileId] = useState("");
  const [profileError, setProfileError] = useState("");
  const [scanningTag, setScanningTag] = useState(false);
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

  function loadProfile(nextProfile: AccessProfile, source: "tag" | "web ID") {
    setProfile(nextProfile);
    setProfileId(nextProfile.id);
    setProfileError("");
    addEvent("Profile verified", `${nextProfile.name} · ${nextProfile.role} · ${source} ${nextProfile.id} · ${nextProfile.language}`, "green");
  }

  function loadProfileById() {
    const normalizedId = profileId.trim().toUpperCase();
    const nextProfile = getAccessProfile(normalizedId);
    if (!nextProfile) {
      setProfile(null);
      setProfileError("ID not found. Check the personal CareVoice tag or ask staff to verify the ID.");
      addEvent("Profile rejected", `Unknown CareVoice ID: ${normalizedId || "blank"}`, "yellow");
      return;
    }
    loadProfile(nextProfile, "web ID");
  }

  async function scanPersonalTag() {
    const Reader = (window as typeof window & { NDEFReader?: NdefReaderConstructor }).NDEFReader;
    if (!Reader) {
      setProfileError("NFC scanning is not available in this browser. Enter the ID printed on the tag below.");
      return;
    }
    setProfileError("");
    setScanningTag(true);
    try {
      const reader = new Reader();
      await reader.scan();
      reader.addEventListener("reading", (event) => {
        const reading = event as NdefReadingEvent;
        const encodedId = reading.message.records
          .map((record) => record.data ? new TextDecoder().decode(record.data) : "")
          .find((value) => getAccessProfile(value));
        const nextProfile = encodedId ? getAccessProfile(encodedId) : null;
        setScanningTag(false);
        if (!nextProfile) {
          setProfileError("This tag does not contain a recognized CareVoice ID.");
          addEvent("Profile rejected", "Unrecognized personal tag.", "yellow");
          return;
        }
        loadProfile(nextProfile, "tag");
      }, { once: true });
    } catch {
      setScanningTag(false);
      setProfileError("NFC access was unavailable or cancelled. Enter the ID printed on the tag below.");
    }
  }

  function chooseMode(nextMode: HubMode) {
    if (!profile) {
      addEvent("Control blocked", "Tap a personal NFC tag or enter a valid CareVoice ID before using controls.", "yellow");
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
    <div className="space-y-4 sm:space-y-6">
      <section className="overflow-hidden rounded-lg border bg-[#222926] text-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-start justify-between gap-3 sm:flex-wrap sm:items-center">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase text-emerald-300">CareVoice Micro · Live control hub</p>
                <h1 className="mt-1 text-xl font-bold leading-tight sm:mt-2 sm:text-3xl md:text-5xl">One touch. One clear care action.</h1>
              </div>
              <Badge className="shrink-0 max-sm:px-2 max-sm:text-[10px]" tone={online ? "green" : "yellow"}>{online ? "Hub online" : "Offline mode"}</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-300 sm:mt-4 sm:text-sm sm:leading-6 md:text-base"><span className="sm:hidden">Load a profile, then choose one care action.</span><span className="hidden sm:inline">This is the working bedside flow behind the physical controller: load an accessibility profile, use one bounded control, receive multimodal confirmation, and leave an auditable handoff.</span></p>
            <div className="mt-4 grid grid-cols-5 gap-1.5 sm:mt-6 sm:gap-2">
              {controls.map(({ mode: controlMode, label, detail, icon: Icon, className }) => (
                <button key={controlMode} type="button" onClick={() => chooseMode(controlMode)} className={`flex min-h-14 min-w-0 flex-col items-center justify-center rounded-md border border-white/15 px-1 py-2 text-center text-zinc-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-h-28 sm:items-start sm:p-3 sm:text-left ${className} ${mode === controlMode ? "ring-2 ring-emerald-400" : ""}`} aria-label={`${label}: ${detail}`}>
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  <strong className="mt-1 block text-[9px] leading-none sm:mt-5 sm:text-sm sm:leading-normal">{label}</strong>
                  <span className="mt-1 hidden text-[11px] leading-4 opacity-70 sm:block">{detail}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/15 bg-black/15 p-4 sm:p-6 md:p-8 xl:border-l xl:border-t-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-emerald-300 text-zinc-900 sm:h-12 sm:w-12"><UserRound className="h-5 w-5 sm:h-6 sm:w-6" /></div>
              <div className="min-w-0"><p className="text-[10px] font-bold uppercase text-zinc-300 sm:text-xs">Personal tag / web ID</p><h2 className="break-words text-base font-bold sm:text-xl">{profile ? `${profile.name} loaded` : "No profile loaded"}</h2>{profile ? <p className="mt-0.5 text-[11px] font-semibold text-emerald-300 sm:mt-1 sm:text-xs">{profile.role} · {profile.id}</p> : null}</div>
            </div>
            {profile ? (
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:mt-6 sm:gap-3 sm:text-sm">
                <div className="border-t border-white/15 pt-2 sm:pt-3"><dt className="text-zinc-300">Language</dt><dd className="font-bold">{profile.language}</dd></div>
                <div className="border-t border-white/15 pt-2 sm:pt-3"><dt className="text-zinc-300">Display</dt><dd className="font-bold">{profile.display}</dd></div>
                <div className="border-t border-white/15 pt-2 sm:pt-3"><dt className="text-zinc-300">Input</dt><dd className="font-bold">{profile.input}</dd></div>
                <div className="border-t border-white/15 pt-2 sm:pt-3"><dt className="text-zinc-300">Family consent</dt><dd className="font-bold">{profile.familyConsent}</dd></div>
              </dl>
            ) : <p className="mt-3 text-xs leading-5 text-zinc-200 sm:mt-5 sm:text-sm sm:leading-6">Tap your personal tag, or enter the ID printed on it when using the web.</p>}
            <Button className="mt-4 min-h-10 w-full bg-white px-3 text-xs text-zinc-950 hover:bg-zinc-100 hover:text-zinc-950 sm:mt-6 sm:min-h-11 sm:text-sm" variant="outline" onClick={() => void scanPersonalTag()} disabled={scanningTag}><Radio className="h-4 w-4" /> {scanningTag ? "Hold tag near device..." : profile ? "Scan another tag" : "Scan personal tag"}</Button>
            <div className="mt-2 rounded-md border border-white/20 bg-black/20 p-2.5 sm:mt-3 sm:p-3">
              <label className="text-xs font-bold text-white" htmlFor="carevoice-profile-id">Using the web? Enter your CareVoice ID</label>
              <div className="mt-2 flex gap-2">
                <Input id="carevoice-profile-id" className="h-10 min-w-0 bg-white text-base text-zinc-950 placeholder:text-zinc-500 sm:min-h-11" value={profileId} onChange={(event) => setProfileId(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") loadProfileById(); }} placeholder="CV-7821" autoCapitalize="characters" autoComplete="off" />
                <Button className="h-10 shrink-0 bg-emerald-300 px-3 text-xs text-zinc-950 hover:bg-emerald-200 sm:min-h-11 sm:text-sm" type="button" onClick={loadProfileById}>Load</Button>
              </div>
              <p className={`mt-2 text-[10px] leading-4 sm:text-xs ${profileError ? "font-semibold text-red-200" : "text-zinc-300"}`} role="status">{profileError || "Demo: CV-7821 patient · CV-2044 nurse · CV-3108 doctor · CV-4492 family"}</p>
            </div>
            <Button className="mt-2 h-10 w-full border-white/60 bg-transparent px-3 text-xs text-white hover:bg-white/10 hover:text-white sm:mt-3 sm:min-h-11 sm:text-sm" variant="outline" onClick={toggleNetwork}>{online ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />} {online ? "Test network loss" : "Restore connection"}</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="sm:min-h-[430px]">
          <CardHeader className="p-4 sm:p-6">
            <CardDescription>Selected physical workflow</CardDescription>
            <CardTitle className="text-xl sm:text-3xl">{mode === "home" ? "Accessible home" : mode === "medication" ? "Medication confirmation" : mode === "nurse" ? "Nurse request" : mode === "family" ? "Family connection" : "Social games"}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            {mode === "home" ? (
              <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2">
                <Button asChild className="min-h-14 justify-start px-3 text-sm sm:min-h-28 sm:px-6 sm:text-xl"><Link href="/patient/voice-assistant"><Bot className="h-5 w-5 sm:h-8 sm:w-8" /> Talk to AI</Link></Button>
                <Button variant="outline" onClick={() => chooseMode("medication")} className="min-h-14 justify-start px-3 text-sm sm:min-h-28 sm:px-6 sm:text-xl"><Pill className="h-5 w-5 sm:h-8 sm:w-8" /> Medication</Button>
                <Button variant="outline" onClick={() => chooseMode("family")} className="min-h-14 justify-start px-3 text-sm sm:min-h-28 sm:px-6 sm:text-xl"><UsersRound className="h-5 w-5 sm:h-8 sm:w-8" /> Family</Button>
                <Button variant="destructive" onClick={() => chooseMode("nurse")} className="min-h-14 justify-start px-3 text-sm sm:min-h-28 sm:px-6 sm:text-xl"><BellRing className="h-5 w-5 sm:h-8 sm:w-8" /> Nurse</Button>
              </div>
            ) : null}

            {mode === "medication" ? (
              <div className="space-y-3 sm:space-y-5">
                <div className="rounded-md border border-amber-300 bg-amber-50 p-4 sm:p-5"><p className="text-xs font-bold text-amber-800 sm:text-sm">Staff-approved reminder · 8:00 AM</p><h3 className="mt-1 text-lg font-bold sm:mt-2 sm:text-2xl">Blue blood-pressure pill</h3><p className="mt-1 text-sm text-muted-foreground sm:mt-2">Take one tablet with warm water. This interface cannot change the prescribed dose.</p></div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3"><Button className="min-h-12 px-3 text-sm sm:min-h-20 sm:text-lg" onClick={() => confirmMedication("taken")}><Check className="h-4 w-4 sm:h-6 sm:w-6" /> Yes, taken</Button><Button className="min-h-12 px-3 text-sm sm:min-h-20 sm:text-lg" variant="outline" onClick={() => confirmMedication("review")}><CircleHelp className="h-4 w-4 sm:h-6 sm:w-6" /> Need help</Button></div>
                <p className="text-sm font-semibold" aria-live="polite">{medicationState === "due" ? "Waiting for a physical YES or help response." : medicationState === "taken" ? "Confirmed. Family will not receive a missed-dose alert." : "Dose unchanged. A nurse review has been added."}</p>
              </div>
            ) : null}

            {mode === "nurse" ? (
              <div className="space-y-3 sm:space-y-5">
                <div className="rounded-md border bg-red-50 p-4 sm:p-5"><p className="text-xs font-bold text-red-800 sm:text-sm">Non-emergency bedside assistance</p><h3 className="mt-1 text-lg font-bold sm:mt-2 sm:text-2xl">Need help getting out of bed?</h3><p className="mt-1 text-sm text-muted-foreground sm:mt-2">The ward receives patient, bed, request type, and timestamp. For immediate danger, call emergency services directly.</p></div>
                {nurseState === "idle" ? <Button variant="destructive" className="min-h-12 w-full text-sm sm:min-h-20 sm:text-lg" onClick={sendNurseRequest}><BellRing className="h-4 w-4 sm:h-6 sm:w-6" /> Send nurse request</Button> : null}
                {nurseState === "sent" ? <div className="grid gap-2 sm:grid-cols-2 sm:gap-3"><Button className="min-h-12 text-sm sm:min-h-20 sm:text-lg" onClick={acknowledgeNurseRequest}><ShieldCheck className="h-4 w-4 sm:h-6 sm:w-6" /> Staff acknowledgement</Button><Button variant="destructive" className="min-h-12 text-sm sm:min-h-20 sm:text-lg" onClick={() => addEvent("Request escalated", "No acknowledgement within the demo SLA; charge nurse notified.", "red")}><BellRing className="h-4 w-4 sm:h-6 sm:w-6" /> Timeout escalation</Button></div> : null}
                {nurseState === "acknowledged" ? <div className="rounded-md border border-emerald-300 bg-emerald-50 p-4 sm:p-5"><p className="font-bold text-emerald-900">Nurse Lee acknowledged · ETA 3 minutes</p><p className="mt-1 text-sm text-emerald-800">The controller would confirm with green light, sound, and vibration.</p></div> : null}
              </div>
            ) : null}

            {mode === "family" ? (
              <div className="space-y-3 sm:space-y-5">
                <div className="rounded-md border bg-blue-50 p-4 sm:p-5"><p className="text-xs font-bold text-blue-800 sm:text-sm">Approved family contact</p><h3 className="mt-1 text-lg font-bold sm:mt-2 sm:text-2xl">Daniel Chan · Son</h3><p className="mt-1 text-sm text-muted-foreground sm:mt-2">Family access is limited to approved summaries, visits, messages, and alerts.</p></div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3"><Button className="min-h-12 px-2 text-sm sm:min-h-20 sm:text-lg" onClick={() => addEvent("Family call started", "Approved video call opened with Daniel Chan.", "blue")}><UsersRound className="h-4 w-4 sm:h-6 sm:w-6" /> Start call</Button><Button variant="outline" className="min-h-12 px-2 text-sm sm:min-h-20 sm:text-lg" onClick={() => addEvent("Voice note shared", "Patient voice note sent to the approved family room.", "blue")}><MessageCircle className="h-4 w-4 sm:h-6 sm:w-6" /> Voice note</Button></div>
              </div>
            ) : null}

            {mode === "games" ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold">Care Match</p><p className="text-sm text-muted-foreground">A simple joystick-friendly memory activity. No health score or diagnosis.</p></div><Button variant="outline" size="sm" onClick={resetGame}><RefreshCw className="h-4 w-4" /> Reset · {moves} moves</Button></div>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                  {gameCards.map((card, index) => {
                    const Icon = gameIcons[card as keyof typeof gameIcons];
                    const isVisible = openCards.includes(index) || matchedCards.includes(index);
                    return <button key={`${card}-${index}`} type="button" onClick={() => chooseGameCard(index)} className={`grid aspect-square place-items-center rounded-md border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isVisible ? "bg-violet-100" : "bg-zinc-800 text-white"}`} aria-label={isVisible ? card : `Hidden card ${index + 1}`}><span>{isVisible ? <><Icon className="mx-auto h-5 w-5 sm:h-8 sm:w-8" /><strong className="mt-1 block text-[10px] sm:mt-2 sm:text-xs">{card}</strong></> : <Gamepad2 className="h-5 w-5 sm:h-8 sm:w-8" />}</span></button>;
                  })}
                </div>
                {matchedCards.length === gameCards.length ? <p className="mt-4 rounded-md bg-emerald-50 p-3 font-bold text-emerald-900">All pairs matched. Activity complete.</p> : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6"><CardDescription>Accountable handoff</CardDescription><CardTitle className="text-lg sm:text-xl">Device audit timeline</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            {events.length ? <ol className="space-y-3">{events.map((event) => <li key={event.id} className="border-l-2 border-primary pl-3"><div className="flex items-center justify-between gap-2"><p className="text-sm font-bold">{event.label}</p><Badge tone={event.tone}>{event.tone}</Badge></div><p className="mt-1 text-xs leading-5 text-muted-foreground">{event.detail}</p></li>)}</ol> : <div className="rounded-md border border-dashed p-5 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" /><p className="mt-3 text-sm font-bold">No actions yet</p><p className="mt-1 text-xs text-muted-foreground">Load a profile and test a physical workflow.</p></div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}