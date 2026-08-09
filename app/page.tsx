"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { ArrowDown, BellRing, Bluetooth, Cable, CheckCircle2, Gamepad2, HeartPulse, LogIn, Mic2, Pill, Radio, ShieldCheck, Stethoscope, UserRound, UsersRound, Volume2 } from "lucide-react";
import { CareVoiceController } from "@/components/carevoice-controller";
import { useCareVoiceProfile } from "@/components/role-provider";
import { Button } from "@/components/ui/button";
import { roleHome, roleLabels, roleSummary, type UserRole } from "@/lib/roles";

const roles: UserRole[] = ["patient", "family", "staff"];

const rolePeople: Record<UserRole, { image: string; alt: string; caption: string }> = {
  patient: { image: "/assets/role-patient.svg", alt: "Elderly patient using CareVoice at home", caption: "Speak, respond, and ask for help with confidence." },
  family: { image: "/assets/role-family.svg", alt: "Family caregiver reviewing a CareVoice update", caption: "See approved updates and stay connected without hovering." },
  staff: { image: "/assets/role-staff.svg", alt: "Medical staff reviewing the CareVoice triage queue", caption: "Review urgency, coordinate care, and close the handoff loop." }
};

const roleTutorials: Record<UserRole, { title: string; steps: string[] }> = {
  patient: { title: "One touch, then talk naturally.", steps: ["Tap an NFC profile card", "Press VOICE or a dedicated care key", "Answer the guided prompt", "Receive spoken and light confirmation"] },
  family: { title: "Stay informed without replacing care staff.", steps: ["Sign in to the approved family role", "Review the patient-safe summary", "Confirm visits or practical support", "Escalate concerns through the care room"] },
  staff: { title: "Turn bedside signals into accountable work.", steps: ["Open the signed staff workspace", "Review Red, Yellow, and Green signals", "Check the source voice summary", "Acknowledge, assign, and document action"] }
};

const controllerKeys = [
  { label: "VOICE", detail: "Start a guided check-in", icon: Mic2, tone: "green" },
  { label: "MEDS", detail: "Hear and answer reminders", icon: Pill, tone: "amber" },
  { label: "NURSE", detail: "Request bedside help", icon: BellRing, tone: "red" },
  { label: "FAMILY", detail: "Open an approved call", icon: UsersRound, tone: "blue" },
  { label: "GAMES", detail: "Join social room activities", icon: Gamepad2, tone: "violet" },
  { label: "DIAL", detail: "Control volume and prompts", icon: Volume2, tone: "neutral" }
];

export default function HomePage() {
  const { status } = useSession();
  const { profile, setRole } = useCareVoiceProfile();
  const [tutorialRole, setTutorialRole] = useState<UserRole>("patient");
  const pendingRoleApplied = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || pendingRoleApplied.current) return;
    const pendingRole = window.sessionStorage.getItem("carevoice.pendingRole") as UserRole | null;
    if (!pendingRole || !roles.includes(pendingRole)) return;
    pendingRoleApplied.current = true;
    window.sessionStorage.removeItem("carevoice.pendingRole");
    void setRole(pendingRole)
      .then(() => { window.location.href = roleHome[pendingRole]; })
      .catch((error: unknown) => window.alert(error instanceof Error ? error.message : "This account cannot use that role."));
  }, [setRole, status]);

  async function chooseRole(role: UserRole) {
    if (status !== "authenticated") {
      window.sessionStorage.setItem("carevoice.pendingRole", role);
      await signIn("google", { callbackUrl: "/#roles" });
      return;
    }
    try {
      await setRole(role);
      window.location.href = roleHome[role];
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not select this role.");
    }
  }

  return (
    <main className="product-page">
      <section id="product" className="product-hero">
        <nav className="product-nav" aria-label="Product navigation">
          <a className="product-brand" href="#product" aria-label="CareVoice Micro home"><span>CV</span><strong>CareVoice <small>Micro</small></strong></a>
          <div className="product-nav-links"><a href="#controls">Controls</a><a href="#concept">Concept</a><a href="#tutorial">Tutorial</a><a href="#roles">Login</a></div>
          {status === "authenticated" ? <Button size="sm" asChild><Link href={roleHome[profile.role]}>Open workspace</Link></Button> : <Button size="sm" onClick={() => signIn("google", { callbackUrl: "/#roles" })}><LogIn className="h-4 w-4" /> Sign in</Button>}
        </nav>
        <CareVoiceController />
        <div className="product-hero-copy">
          <p className="product-kicker">Bedside control, made tangible</p>
          <h1>CareVoice<br />Micro</h1>
          <p className="product-lead">A tactile voice controller that turns medication questions, symptoms, family contact, and bedside requests into clear, accountable care actions.</p>
          <div className="product-hero-actions"><Button size="lg" asChild><a href="#tutorial">See how it works <ArrowDown className="h-4 w-4" /></a></Button><Button size="lg" variant="outline" asChild><a href="#roles">Choose your role</a></Button></div>
        </div>
        <aside className="product-specs" aria-label="Controller specifications">
          <p>CV-M / 01</p>
          <dl><div><dt>Connection</dt><dd><Bluetooth /> Bluetooth</dd></div><div><dt>Fallback</dt><dd><Cable /> USB-C</dd></div><div><dt>Local hub</dt><dd><Radio /> Raspberry Pi</dd></div><div><dt>Controls</dt><dd>8 keys + dial</dd></div><div><dt>Profiles</dt><dd>NFC / QR</dd></div></dl>
        </aside>
      </section>

      <section id="concept" className="product-band product-concept">
        <div className="section-heading"><p className="product-kicker">The concept</p><h2>Healthcare technology should meet people where their hands already are.</h2></div>
        <div className="concept-grid"><p className="concept-lead">CareVoice Micro removes menus from the moments that matter. Large tactile controls start a constrained workflow; voice captures context; the authenticated platform routes the result to the right person.</p><div className="concept-principles"><article><span>01</span><h3>Physical first</h3><p>Distinct shapes, colors, and fixed positions reduce screen dependence.</p></article><article><span>02</span><h3>Voice for context</h3><p>People describe how they feel in their own words and language.</p></article><article><span>03</span><h3>Human in the loop</h3><p>Rules flag urgency; authorized people review and take action.</p></article></div></div>
      </section>

      <section id="controls" className="product-band controller-key-section">
        <div className="section-heading compact"><p className="product-kicker">One control, one intention</p><h2>No buried menus. No mystery gestures.</h2><p>Each control begins one bounded care workflow and confirms what happened through light, sound, and voice.</p></div>
        <div className="controller-key-grid">{controllerKeys.map(({ label, detail, icon: Icon, tone }) => <article key={label} className={`controller-key key-${tone}`}><Icon aria-hidden="true" /><strong>{label}</strong><p>{detail}</p></article>)}</div>
      </section>

      <section id="tutorial" className="product-band tutorial-section">
        <div className="tutorial-intro"><p className="product-kicker">Full concept tutorial</p><h2>From one bedside signal to a closed care loop.</h2><p>The controller does not diagnose. It structures the first interaction, preserves the patient&apos;s words, and makes the next responsible person visible.</p></div>
        <div className="care-loop" aria-label="CareVoice concept workflow"><article><span>01</span><UserRound /><h3>Identify</h3><p>NFC or QR opens the correct patient profile and permissions.</p></article><article><span>02</span><Mic2 /><h3>Capture</h3><p>A dedicated key starts a short bilingual voice prompt.</p></article><article><span>03</span><HeartPulse /><h3>Classify</h3><p>Auditable rules label medication, symptom, routine, or urgent signals.</p></article><article><span>04</span><Stethoscope /><h3>Route</h3><p>The summary reaches the authorized family or clinical workspace.</p></article><article><span>05</span><CheckCircle2 /><h3>Close</h3><p>A person acknowledges the action and leaves an audit trail.</p></article></div>
        <div className="role-tutorial"><div className="role-tutorial-tabs" role="tablist" aria-label="Tutorial by role">{roles.map((role) => <button key={role} type="button" role="tab" aria-selected={tutorialRole === role} className={tutorialRole === role ? "is-active" : ""} onClick={() => setTutorialRole(role)}>{roleLabels[role]}</button>)}</div><div className="role-tutorial-content"><div><p className="product-kicker">{roleLabels[tutorialRole]} journey</p><h3>{roleTutorials[tutorialRole].title}</h3></div><ol>{roleTutorials[tutorialRole].steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div></div>
      </section>

      <section className="product-band trust-section"><div><ShieldCheck /><p className="product-kicker">Trust is a system behavior</p><h2>Role access is signed on the server, not painted onto the UI.</h2></div><ul><li>Auth.js Google session is the source of truth</li><li>Staff accounts require a server-side email allowlist</li><li>Room invitations bind recipient, role, room, and expiry</li><li>Clinical escalation stays visible and human-reviewed</li></ul></section>

      <section id="roles" className="product-band role-entry-section">
        <div className="section-heading"><p className="product-kicker">Enter CareVoice</p><h2>One platform, three accountable views.</h2><p>Choose the role that matches your responsibility. Google sign-in happens before the server authorizes the workspace.</p></div>
        <div className="role-entry-grid">{roles.map((role) => { const Icon = roleSummary[role].icon; const person = rolePeople[role]; return <article key={role} className={profile.role === role ? "role-entry is-current" : "role-entry"}><Image src={person.image} alt={person.alt} width={720} height={420} /><div className="role-entry-copy"><Icon /><p>{person.caption}</p><h3>{roleLabels[role]}</h3><span>{roleSummary[role].description}</span><Button className="w-full" variant={profile.role === role ? "default" : "outline"} disabled={status === "loading"} onClick={() => void chooseRole(role)}>{status === "authenticated" ? `Open ${roleLabels[role]}` : `Sign in as ${roleLabels[role]}`}</Button></div></article>; })}</div>
      </section>

      <footer className="product-footer"><div className="product-brand"><span>CV</span><strong>CareVoice <small>Micro</small></strong></div><p>Demo prototype. Not a medical device or emergency service.</p><a href="#product">Back to controller</a></footer>
    </main>
  );
}