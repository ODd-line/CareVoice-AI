"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SupportMessage = { role: "user" | "support"; text: string; mode?: string };

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([
    { role: "support", text: "Hi, I’m CareVoice Support. I can help with account setup, rooms, QR codes, voice access, WhatsApp, and role permissions." }
  ]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("support") === "open") setOpen(true);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || sending) return;
    setInput("");
    setSending(true);
    setMessages((current) => [...current, { role: "user", text: message }]);
    try {
      const response = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
      const result = await response.json() as { reply?: string; mode?: string; error?: string };
      setMessages((current) => [...current, { role: "support", text: response.ok && result.reply ? result.reply : result.error || "Support is unavailable right now.", mode: result.mode }]);
    } catch {
      setMessages((current) => [...current, { role: "support", text: "Support could not connect. Please try again." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[80] sm:bottom-5 sm:right-5">
      {open ? <section className="mb-3 flex h-[min(560px,75dvh)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg border bg-background shadow-2xl max-sm:fixed max-sm:inset-x-2 max-sm:bottom-[max(0.5rem,env(safe-area-inset-bottom))] max-sm:mb-0 max-sm:h-[calc(100dvh-max(0.5rem,env(safe-area-inset-bottom))-0.5rem)] max-sm:w-auto" aria-label="CareVoice customer support">
        <header className="flex shrink-0 items-center justify-between gap-2 border-b bg-primary px-4 py-3 text-primary-foreground"><div className="flex min-w-0 items-center gap-2"><Bot className="h-5 w-5 shrink-0" /><div className="min-w-0"><p className="font-semibold">CareVoice Support</p><p className="truncate text-xs opacity-80">Product help, not medical advice</p></div></div><Button type="button" size="icon" variant="ghost" className="shrink-0 text-primary-foreground hover:bg-white/15" onClick={() => setOpen(false)} aria-label="Close support chat"><X className="h-5 w-5" /></Button></header>
        <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 sm:p-4" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-6 break-words rounded-md bg-primary p-3 text-sm text-primary-foreground sm:ml-8" : "mr-6 break-words rounded-md bg-muted p-3 text-sm sm:mr-8"}><p>{message.text}</p>{message.mode ? <p className="mt-2 text-[10px] uppercase opacity-60">{message.mode === "gemini-assisted" ? "AI assisted" : "Verified support fallback"}</p> : null}</div>)}{sending ? <p className="text-xs text-muted-foreground">Support is preparing a reply...</p> : null}</div>
        <form className="flex shrink-0 gap-2 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]" onSubmit={(event) => void submit(event)}><Input className="text-base sm:text-sm" value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask about CareVoice" aria-label="Support question" /><Button type="submit" size="icon" className="shrink-0" disabled={sending || !input.trim()} aria-label="Send support question"><Send className="h-4 w-4" /></Button></form>
      </section> : null}
      <Button type="button" size="icon" className={`ml-auto h-14 w-14 rounded-full shadow-xl ${open ? "max-sm:hidden" : ""}`} onClick={() => setOpen((current) => !current)} aria-label={open ? "Close CareVoice support" : "Open CareVoice support"}><MessageCircle className="h-6 w-6" /></Button>
    </div>
  );
}