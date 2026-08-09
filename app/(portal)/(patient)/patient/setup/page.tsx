"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ExternalLink, MessageCircle, Mic, ShieldCheck, Volume2 } from "lucide-react";
import { useCareVoiceProfile } from "@/components/role-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

type RecognitionWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
};

export default function PatientSetupPage() {
  const router = useRouter();
  const { profile, setProfile } = useCareVoiceProfile();
  const [draft, setDraft] = useState(profile);
  const [voiceStatus, setVoiceStatus] = useState("Not tested yet");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const whatsappUrl = createWhatsAppUrl(
    draft.whatsappNumber,
    "Hello from CareVoice. I am testing my approved WhatsApp contact link."
  );

  function testListening() {
    const speechWindow = window as RecognitionWindow;
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceStatus("Speech recognition is unavailable in this browser. Typing will remain available.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = draft.preferredLanguage;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || "Voice heard";
      setVoiceStatus(`Microphone ready: “${transcript}”`);
    };
    recognition.onerror = () => setVoiceStatus("Microphone access was unavailable. Check browser permission and try again.");
    recognition.onend = () => setVoiceStatus((current) => current === "Listening..." ? "No speech was detected. Try again." : current);
    setVoiceStatus("Listening...");
    recognition.start();
  }

  function testReply() {
    if (!("speechSynthesis" in window)) {
      setVoiceStatus("Spoken replies are unavailable in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const message = draft.preferredLanguage === "zh-HK"
      ? "CareVoice 已準備好聆聽。"
      : "CareVoice is ready to listen.";
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = draft.preferredLanguage;
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
    setVoiceStatus("Spoken reply played.");
  }

  async function finishSetup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError("");
    if (!draft.phone.trim() || !draft.emergencyContact.trim()) {
      setSaveError("Add your phone number and an emergency contact before continuing.");
      return;
    }
    if (draft.whatsappConsent && !normalizeWhatsAppNumber(draft.whatsappNumber)) {
      setSaveError("Enter a valid WhatsApp number with country code, for example +852 9123 4567.");
      return;
    }

    setSaving(true);
    try {
      await setProfile({ ...draft, role: "patient", setupComplete: true });
      router.replace("/patient/voice-assistant");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save account setup.");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">First-time patient setup</p>
        <h1 className="mt-2 text-4xl font-bold">Make CareVoice yours</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">Confirm how we can reach you, choose your assistant language, and test voice access before entering the patient workspace.</p>
      </div>

      <form className="grid gap-6 lg:grid-cols-2" onSubmit={(event) => void finishSetup(event)}>
        <Card>
          <CardHeader>
            <CardTitle>1. Patient contacts</CardTitle>
            <CardDescription>These details are saved in this browser for the current prototype account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label htmlFor="phone">Phone number</Label><Input id="phone" type="tel" autoComplete="tel" placeholder="+852 6123 4567" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} required /></div>
            <div className="grid gap-2"><Label htmlFor="emergency">Emergency contact</Label><Input id="emergency" placeholder="Name, relationship, phone" value={draft.emergencyContact} onChange={(event) => setDraft({ ...draft, emergencyContact: event.target.value })} required /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageCircle className="h-5 w-5" /> 2. WhatsApp handoff</CardTitle>
            <CardDescription>CareVoice can prepare an approved message and open WhatsApp. This does not give CareVoice access to your chats or password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label htmlFor="whatsapp">WhatsApp number with country code</Label><Input id="whatsapp" type="tel" autoComplete="tel" placeholder="+852 9123 4567" value={draft.whatsappNumber} onChange={(event) => setDraft({ ...draft, whatsappNumber: event.target.value })} /></div>
            <label className="flex items-start gap-3 rounded-md border p-3 text-sm"><input className="mt-1" type="checkbox" checked={draft.whatsappConsent} onChange={(event) => setDraft({ ...draft, whatsappConsent: event.target.checked })} /><span><strong className="block">Allow WhatsApp handoffs</strong>CareVoice may open a prepared message only when I ask. I review and send it inside WhatsApp.</span></label>
            <Button type="button" variant="outline" disabled={!draft.whatsappConsent || !whatsappUrl} asChild={Boolean(draft.whatsappConsent && whatsappUrl)}>
              {draft.whatsappConsent && whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> Test WhatsApp</a> : <span><ExternalLink className="h-4 w-4" /> Test WhatsApp</span>}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>3. Voice access</CardTitle>
            <CardDescription>Your browser asks for microphone permission. Audio is transcribed by the browser; typed chat remains available.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-2"><Label htmlFor="language">Assistant language</Label><select id="language" className="h-11 rounded-md border bg-background px-3" value={draft.preferredLanguage} onChange={(event) => setDraft({ ...draft, preferredLanguage: event.target.value as "en-US" | "zh-HK" })}><option value="en-US">English</option><option value="zh-HK">Cantonese (Hong Kong)</option></select></div>
            <div className="flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={testListening}><Mic className="h-4 w-4" /> Test microphone</Button><Button type="button" variant="outline" onClick={testReply}><Volume2 className="h-4 w-4" /> Test reply</Button></div>
            <p className="rounded-md bg-muted p-3 text-sm md:col-span-2" aria-live="polite">{voiceStatus}</p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 lg:col-span-2">
          <div className="flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p>CareVoice offers non-diagnostic assistance. Urgent symptoms still require local emergency services or a qualified care professional.</p></div>
          {saveError ? <p className="text-sm font-semibold text-red-700" role="alert">{saveError}</p> : null}
          <Button className="min-h-12 self-start" type="submit" disabled={saving}><CheckCircle2 className="h-5 w-5" /> {saving ? "Saving setup..." : "Finish setup and talk to CareVoice"}</Button>
        </div>
      </form>
    </div>
  );
}