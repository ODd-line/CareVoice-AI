"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BellRing,
  Bot,
  Check,
  CircleHelp,
  Clock3,
  Gamepad2,
  Grid3X3,
  House,
  LayoutGrid,
  Maximize2,
  MessageCircle,
  Moon,
  Pill,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  UserRound,
  UsersRound,
  Volume2,
  VolumeX,
  Wifi
} from "lucide-react";
import styles from "./carevoice-desktop.module.css";
import { LocalDevicePairing } from "./local-device-pairing";
import { LocalMahjongGame } from "./local-mahjong-game";

type DesktopApp = "home" | "games" | "mahjong" | "memory" | "noughts" | "medication" | "family" | "help" | "settings";

const memoryFaces = [
  { label: "Tea", icon: "茶" },
  { label: "Flower", icon: "花" },
  { label: "Moon", icon: "月" },
  { label: "Bird", icon: "鳥" },
  { label: "Bamboo", icon: "竹" },
  { label: "Sun", icon: "日" }
];

function shuffled<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState(() => memoryFaces.flatMap((item, pair) => [{ ...item, id: pair * 2 }, { ...item, id: pair * 2 + 1 }]));
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  function newGame() {
    setCards(shuffled(memoryFaces.flatMap((item, pair) => [{ ...item, id: pair * 2 }, { ...item, id: pair * 2 + 1 }])));
    setOpen([]);
    setMatched([]);
    setMoves(0);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => newGame(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function chooseCard(id: number) {
    if (open.length === 2 || open.includes(id) || matched.includes(id)) return;
    const nextOpen = [...open, id];
    setOpen(nextOpen);
    if (nextOpen.length !== 2) return;
    setMoves((current) => current + 1);
    const first = cards.find((card) => card.id === nextOpen[0]);
    const second = cards.find((card) => card.id === nextOpen[1]);
    if (first?.label === second?.label) {
      setMatched((current) => [...current, ...nextOpen]);
      setOpen([]);
    } else {
      window.setTimeout(() => setOpen([]), 700);
    }
  }

  return (
    <section className={styles.gameScreen} aria-labelledby="memory-garden-title">
      <GameHeader title="Memory Garden" subtitle={`${matched.length / 2} of 6 pairs · ${moves} moves`} onBack={onBack} onReset={newGame} />
      <div className={styles.memoryBoard}>
        {cards.map((card) => {
          const visible = open.includes(card.id) || matched.includes(card.id);
          return <button key={card.id} type="button" className={`${styles.memoryCard} ${visible ? styles.cardOpen : ""}`} onClick={() => chooseCard(card.id)} aria-label={visible ? card.label : "Hidden garden card"}><span>{visible ? card.icon : "?"}</span><small>{visible ? card.label : "Find a pair"}</small></button>;
        })}
      </div>
      {matched.length === cards.length ? <div className={styles.gameMessage}><Trophy />Garden complete in {moves} moves!</div> : null}
    </section>
  );
}

function NoughtsGame({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const winner = lines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  const winningMark = winner ? board[winner[0]] : null;
  const draw = !winningMark && board.every(Boolean);

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }

  function play(index: number) {
    if (board[index] || winningMark) return;
    setBoard((current) => current.map((cell, cellIndex) => cellIndex === index ? turn : cell));
    setTurn((current) => current === "X" ? "O" : "X");
  }

  return (
    <section className={styles.gameScreen} aria-labelledby="noughts-&-crosses-title">
      <GameHeader title="Noughts & Crosses" subtitle={winningMark ? `${winningMark} wins` : draw ? "A friendly draw" : `${turn}'s turn`} onBack={onBack} onReset={reset} />
      <div className={styles.noughtsBoard}>{board.map((cell, index) => <button key={index} type="button" onClick={() => play(index)} disabled={Boolean(cell || winningMark)} aria-label={cell ? `Square ${index + 1}: ${cell}` : `Play square ${index + 1}`}>{cell}</button>)}</div>
      <div className={styles.gameMessage}><Grid3X3 />{winningMark ? `Player ${winningMark} made three in a row.` : draw ? "Nobody lost. Play again?" : "Take turns on the same screen."}</div>
    </section>
  );
}

function GameHeader({ title, subtitle, onBack, onReset }: { title: string; subtitle: string; onBack: () => void; onReset: () => void }) {
  return (
    <header className={styles.gameHeader}>
      <button type="button" className={styles.iconButton} onClick={onBack} aria-label="Back to games"><ArrowLeft /></button>
      <div><h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}>{title}</h2><p>{subtitle}</p></div>
      <button type="button" className={styles.iconButton} onClick={onReset} aria-label={`Restart ${title}`}><RefreshCw /></button>
    </header>
  );
}

const desktopApps = [
  { id: "games" as const, label: "Games", detail: "Mahjong and more", icon: Gamepad2, tone: "coral" },
  { id: "medication" as const, label: "Medication", detail: "Today’s reminder", icon: Pill, tone: "amber" },
  { id: "family" as const, label: "Family", detail: "Call approved contacts", icon: UsersRound, tone: "blue" },
  { id: "help" as const, label: "Ask for help", detail: "Contact a caregiver", icon: BellRing, tone: "red" }
];

export function CareVoiceDesktop({ initialApp = "home", initialRoomCode = "" }: { initialApp?: DesktopApp; initialRoomCode?: string }) {
  const [activeApp, setActiveApp] = useState<DesktopApp>(initialApp);
  const [now, setNow] = useState<Date | null>(null);
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(true);
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [helpSent, setHelpSent] = useState(false);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  function announce(message: string) {
    if (!sound || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
  }

  function openApp(app: DesktopApp) {
    setActiveApp(app);
    announce(app === "games" ? "Games opened" : `${app} opened`);
  }

  const clock = now?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? "--:--";
  const date = now?.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) ?? "CareVoice is ready";

  return (
    <main className={`${styles.desktop} ${dark ? styles.dark : ""}`}>
      <header className={styles.topbar}>
        <button type="button" className={styles.brand} onClick={() => setActiveApp("home")}><span>CV</span><strong>CareVoice Home</strong></button>
        <div className={styles.systemStatus}><span><Wifi /> Local AI online</span><button type="button" onClick={() => setSound((current) => !current)} aria-label={sound ? "Mute spoken feedback" : "Enable spoken feedback"}>{sound ? <Volume2 /> : <VolumeX />}</button><button type="button" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter full screen"><Maximize2 /></button><time>{clock}</time></div>
      </header>

      <div className={styles.workspace}>
        {activeApp === "home" ? (
          <>
            <section className={styles.welcome}>
              <div><p>{date}</p><h1>Good {now && now.getHours() >= 18 ? "evening" : now && now.getHours() >= 12 ? "afternoon" : "morning"}.</h1><span>Your care tools and favourite activities are ready.</span></div>
              <Link href="/patient/voice-assistant" className={styles.talkButton}><span><Bot /></span><strong>Talk to CareVoice</strong><small>Ask a question or record how you feel</small></Link>
            </section>
            <section className={styles.launchSection} aria-labelledby="apps-title"><div className={styles.sectionTitle}><h2 id="apps-title">Your apps</h2><span>Choose once to open</span></div><div className={styles.appGrid}>{desktopApps.map(({ id, label, detail, icon: Icon, tone }) => <button key={id} type="button" className={styles.appTile} onClick={() => openApp(id)}><span className={`${styles.appIcon} ${styles[tone]}`}><Icon /></span><strong>{label}</strong><small>{detail}</small></button>)}</div></section>
            <section className={styles.todayStrip}><div><Clock3 /><span><strong>Next reminder</strong><small>Blue blood-pressure pill · 8:00 PM</small></span></div><button type="button" onClick={() => openApp("medication")}>View reminder</button></section>
          </>
        ) : null}

        {activeApp === "games" ? <section className={styles.library}><header><button type="button" className={styles.iconButton} onClick={() => setActiveApp("home")} aria-label="Back home"><ArrowLeft /></button><div><p>Activities</p><h1>Games room</h1><span>Relax, play together, or keep your mind moving.</span></div></header><div className={styles.gameLibrary}><button type="button" className={styles.gameFeature} onClick={() => setActiveApp("mahjong")}><span className={styles.mahjongPreview}><i>春</i><i>竹</i><i>八</i></span><div><em>Most played</em><h2>Mahjong 3D</h2><p>Match beautifully rendered tiles and clear the table.</p><strong>Play now</strong></div></button><button type="button" className={styles.gameCard} onClick={() => setActiveApp("memory")}><span><Sparkles /></span><div><h2>Memory Garden</h2><p>Find six peaceful picture pairs.</p></div></button><button type="button" className={styles.gameCard} onClick={() => setActiveApp("noughts")}><span><Grid3X3 /></span><div><h2>Noughts & Crosses</h2><p>A familiar two-player favourite.</p></div></button></div></section> : null}
        {activeApp === "mahjong" ? <LocalMahjongGame initialRoomCode={initialRoomCode} onBack={() => setActiveApp("games")} /> : null}
        {activeApp === "memory" ? <MemoryGame onBack={() => setActiveApp("games")} /> : null}
        {activeApp === "noughts" ? <NoughtsGame onBack={() => setActiveApp("games")} /> : null}

        {activeApp === "medication" ? <SimpleWindow title="Medication" icon={<Pill />} onBack={() => setActiveApp("home")}><div className={styles.reminder}><span>8:00 PM</span><h2>Blue blood-pressure pill</h2><p>Take one tablet with warm water. CareVoice cannot change your prescribed dose.</p><button type="button" className={medicationTaken ? styles.confirmed : ""} onClick={() => { setMedicationTaken(true); announce("Medication marked as taken"); }}><Check />{medicationTaken ? "Marked as taken" : "Yes, I took it"}</button><Link href="/patient/micro"><CircleHelp /> I need help with this reminder</Link></div></SimpleWindow> : null}
        {activeApp === "family" ? <SimpleWindow title="Family" icon={<UsersRound />} onBack={() => setActiveApp("home")}><div className={styles.contact}><span><UserRound /></span><div><h2>Daniel Chan</h2><p>Son · Approved contact</p></div><button type="button" onClick={() => announce("Starting family call")}>Start call</button><button type="button" className={styles.secondaryAction} onClick={() => announce("Opening voice message")}><MessageCircle /> Voice message</button></div></SimpleWindow> : null}
        {activeApp === "help" ? <SimpleWindow title="Ask for help" icon={<BellRing />} onBack={() => setActiveApp("home")}><div className={styles.helpPanel}><ShieldCheck /><h2>{helpSent ? "Request sent" : "Would you like a caregiver?"}</h2><p>{helpSent ? "A caregiver has received your non-emergency request. Please stay where you are." : "This sends a non-emergency assistance request to the care team."}</p><button type="button" disabled={helpSent} onClick={() => { setHelpSent(true); announce("Caregiver request sent"); }}><BellRing />{helpSent ? "Caregiver notified" : "Send caregiver request"}</button><small>For immediate danger, call local emergency services directly.</small></div></SimpleWindow> : null}
        {activeApp === "settings" ? <SimpleWindow title="Settings" icon={<Settings />} onBack={() => setActiveApp("home")}><div className={styles.settingsList}><button type="button" onClick={() => setDark((current) => !current)}>{dark ? <Sun /> : <Moon />}<span><strong>{dark ? "Use light appearance" : "Use dark appearance"}</strong><small>Change screen colours</small></span></button><button type="button" onClick={() => setSound((current) => !current)}>{sound ? <Volume2 /> : <VolumeX />}<span><strong>Spoken feedback {sound ? "on" : "off"}</strong><small>Read important actions aloud</small></span></button></div><LocalDevicePairing /></SimpleWindow> : null}
      </div>

      <nav className={styles.dock} aria-label="CareVoice home controls"><button type="button" className={activeApp === "home" ? styles.dockActive : ""} onClick={() => setActiveApp("home")}><House /><span>Home</span></button><button type="button" className={["games", "mahjong", "memory", "noughts"].includes(activeApp) ? styles.dockActive : ""} onClick={() => setActiveApp("games")}><Gamepad2 /><span>Games</span></button><Link href="/patient/voice-assistant"><Bot /><span>CareVoice</span></Link><button type="button" className={activeApp === "settings" ? styles.dockActive : ""} onClick={() => setActiveApp("settings")}><Settings /><span>Settings</span></button><button type="button" onClick={() => setActiveApp("home")}><LayoutGrid /><span>All apps</span></button></nav>
    </main>
  );
}

function SimpleWindow({ title, icon, onBack, children }: { title: string; icon: React.ReactNode; onBack: () => void; children: React.ReactNode }) {
  return <section className={styles.simpleWindow}><header><button type="button" className={styles.iconButton} onClick={onBack} aria-label="Back home"><ArrowLeft /></button><span>{icon}</span><h1>{title}</h1></header>{children}</section>;
}