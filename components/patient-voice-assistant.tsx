"use client";

import { useState } from "react";
import { Bot, Mic, Send, ShieldAlert, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCareVoiceProfile } from "@/components/role-provider";
import { careVoiceVoiceProfiles } from "@/lib/mock-data";
import { createWhatsAppUrl, isWhatsAppRequest } from "@/lib/whatsapp";

type AssistantMessage = {
  role: "patient" | "assistant";
  text: string;
  urgency?: "green" | "yellow" | "red";
  actions?: string[];
  whatsappUrl?: string;
};

type VoicePreference = {
  gender: "female" | "male";
  language: "en-US" | "zh-HK";
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    SpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

const openingMessage: AssistantMessage = {
  role: "assistant",
  text: "Hello, I am CareVoice. You can speak to me about pain, medicine, appointments, or calling family. If you mention urgent symptoms, I will tell you to call for help and mark it for the care team.",
  urgency: "green",
  actions: ["Voice health log", "Medication question", "Calendar help"]
};

export function PatientVoiceAssistant() {
  const { profile } = useCareVoiceProfile();
  const [messages, setMessages] = useState<AssistantMessage[]>([openingMessage]);
  const [input, setInput] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState(careVoiceVoiceProfiles[0]?.personId || "patient-mei-wong");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const selectedProfile = careVoiceVoiceProfiles.find((profile) => profile.personId === selectedPersonId) || careVoiceVoiceProfiles[0];

  async function sendMessage(text: string) {
    const cleanText = text.trim();
    if (!cleanText) return;

    setInput("");
    setIsThinking(true);
    setMessages((current) => [...current, { role: "patient", text: cleanText }]);

    try {
      const response = await fetch("/api/voice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanText, personId: selectedPersonId })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(String(result.error || "CareVoice could not prepare a reply."));
      const reply: AssistantMessage = {
        role: "assistant",
        text: String(result.reply || "No reply was returned."),
        urgency: result.urgency,
        actions: Array.isArray(result.actions) ? result.actions : [],
        whatsappUrl: profile.whatsappConsent && isWhatsAppRequest(cleanText)
          ? createWhatsAppUrl(profile.whatsappNumber, `CareVoice update: ${cleanText}`) || undefined
          : undefined
      };

      setMessages((current) => [...current, reply]);
      speak(reply.text, { gender: result.speaker?.preferredVoice || selectedProfile.preferredVoice, language: profile.preferredLanguage });
    } catch (error) {
      setMessages((current) => [...current, {
        role: "assistant",
        text: error instanceof Error ? error.message : "CareVoice could not connect. Please try again.",
        urgency: "yellow"
      }]);
    } finally {
      setIsThinking(false);
    }
  }

  function startListening() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setMessages((current) => [...current, { role: "assistant", text: "This browser does not support live speech recognition. You can type your message instead.", urgency: "yellow" }]);
      return;
    }

    const recognition = new Recognition();
  recognition.lang = profile.preferredLanguage;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || "";
      void sendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  }

  function chooseSpeechVoice(preference: VoicePreference) {
    const voices = window.speechSynthesis.getVoices();
    const sameLanguage = voices.filter((voice) => voice.lang === preference.language || voice.lang.startsWith(preference.language.split("-")[0]));
    const candidates = sameLanguage.length ? sameLanguage : voices;
    const genderHints = preference.gender === "female"
      ? ["female", "woman", "samantha", "victoria", "karen", "moira", "ting-ting", "mei", "zira"]
      : ["male", "man", "daniel", "alex", "fred", "tom", "david", "mark"];

    return candidates.find((voice) => genderHints.some((hint) => voice.name.toLowerCase().includes(hint))) || candidates[0] || null;
  }

  function speak(text: string, preference: VoicePreference) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = preference.language;
    const matchedVoice = chooseSpeechVoice(preference);
    if (matchedVoice) utterance.voice = matchedVoice;
    utterance.rate = 0.88;
    utterance.pitch = preference.gender === "female" ? 1.08 : 0.88;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary bg-white">
        <CardHeader className="text-center">
          <CardDescription>CareVoice Patient Assistant</CardDescription>
          <CardTitle className="text-4xl md:text-6xl">Talk to CareVoice</CardTitle>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">A Jarvis-style voice companion for elderly patients: listen, reply out loud, triage risk, and prepare a care-team summary.</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <label className="grid w-full max-w-xl gap-2 text-left text-sm font-semibold">
            Choose patient/person voice profile
            <select
              value={selectedPersonId}
              onChange={(event) => setSelectedPersonId(event.target.value)}
              className="h-12 rounded-md border bg-background px-3 text-base"
              aria-label="Choose CareVoice person voice profile"
            >
              {careVoiceVoiceProfiles.map((profile) => (
                <option key={profile.personId} value={profile.personId}>{profile.label} - {profile.preferredVoice} voice</option>
              ))}
            </select>
          </label>
          <Button onClick={startListening} className="h-56 w-56 rounded-full text-2xl shadow-xl md:h-72 md:w-72" aria-label="Start CareVoice listening">
            <span className="flex flex-col items-center gap-4">
              <Mic className="h-20 w-20" /> {isListening ? "Listening..." : "Speak Now"}
            </span>
          </Button>
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
            <span className="flex items-center gap-2"><Bot className="h-4 w-4 text-primary" /> Hospital model with safety fallback</span>
            <span className="flex items-center gap-2"><Volume2 className="h-4 w-4 text-primary" /> {selectedProfile?.preferredVoice || "Matched"} reply voice</span>
            <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-primary" /> Rule-based urgent escalation</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assistant Chat</CardTitle>
          <CardDescription>Voice transcripts and CareVoice replies appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "patient" ? "rounded-lg border bg-secondary/70 p-4" : "rounded-lg border bg-muted/50 p-4"}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-semibold">{message.role === "patient" ? "Patient" : "CareVoice"}</p>
                  {message.urgency ? <Badge tone={message.urgency}>{message.urgency}</Badge> : null}
                </div>
                <p>{message.text}</p>
                {message.actions ? <div className="mt-3 flex flex-wrap gap-2">{message.actions.map((action) => <Badge key={action} tone="blue">{action}</Badge>)}</div> : null}
                {message.whatsappUrl ? <Button className="mt-3" variant="outline" asChild><a href={message.whatsappUrl} target="_blank" rel="noreferrer">Review in WhatsApp</a></Button> : null}
              </div>
            ))}
            {isThinking ? <p className="text-sm text-muted-foreground">CareVoice is preparing a reply...</p> : null}
          </div>
          <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); void sendMessage(input); }}>
            <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type if speaking is not available" />
            <Button type="submit"><Send className="h-4 w-4" /> Send</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How CareVoice AI is connected</CardTitle>
          <CardDescription>Conversational help can use a hospital-hosted model while urgent escalation remains deterministic and auditable.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4"><h3 className="font-semibold">1. Speech-to-text</h3><p className="mt-2 text-sm text-muted-foreground">Use browser Web Speech for prototype, or Whisper/Azure Speech/Google Speech for production Cantonese and noisy-room accuracy.</p></div>
          <div className="rounded-lg border p-4"><h3 className="font-semibold">2. Model assistance</h3><p className="mt-2 text-sm text-muted-foreground">The protected API requests structured, non-diagnostic replies from the hospital model, with optional Gemini backup. Invalid or unavailable output falls back locally.</p></div>
          <div className="rounded-lg border p-4"><h3 className="font-semibold">3. Voice reply</h3><p className="mt-2 text-sm text-muted-foreground">CareVoice chooses a male or female voice profile from the person database. Browser voices vary by device; production can use Azure or Google neural TTS for guaranteed gender/language voices.</p></div>
        </CardContent>
      </Card>
    </div>
  );
}