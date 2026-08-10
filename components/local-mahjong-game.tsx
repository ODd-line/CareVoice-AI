"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { ArrowLeft, Copy, QrCode, RefreshCw, Sparkles, Trophy, UsersRound } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import styles from "./carevoice-desktop.module.css";

type RoomState = {
  code: string;
  tiles: { id: number; face: string }[];
  removedTileIds: number[];
  players: { id: string; name: string; matches: number; moves: number; finishedAt: string | null }[];
  currentPlayerId: string;
};

type RoomResponse = { state?: RoomState; playerToken?: string; joinUrl?: string; matched?: boolean; error?: string };

export function LocalMahjongGame({ initialRoomCode = "", onBack }: { initialRoomCode?: string; onBack: () => void }) {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [playerToken, setPlayerToken] = useState("");
  const [state, setState] = useState<RoomState | null>(null);
  const [joinUrl, setJoinUrl] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState("Create a local room or join your friends.");
  const [busy, setBusy] = useState(false);
  const activeRoomCode = state?.code;

  useEffect(() => {
    const timer = window.setTimeout(() => setPlayerName(window.localStorage.getItem("carevoice.mahjongName") || ""), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activeRoomCode || !playerToken) return;
    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/local/mahjong?code=${encodeURIComponent(activeRoomCode)}&playerToken=${encodeURIComponent(playerToken)}`, { cache: "no-store" });
      if (!response.ok) return;
      const result = await response.json() as RoomResponse;
      if (result.state) setState(result.state);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [activeRoomCode, playerToken]);

  async function roomAction(action: "create" | "join") {
    if (!playerName.trim()) {
      setMessage("Enter the name friends will see.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/local/mahjong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action === "create" ? { action, playerName } : { action, playerName, code: roomCode.toUpperCase() })
      });
      const result = await response.json() as RoomResponse;
      if (!response.ok || !result.state || !result.playerToken) throw new Error(result.error || "Could not open the room.");
      window.localStorage.setItem("carevoice.mahjongName", playerName.trim());
      setState(result.state);
      setPlayerToken(result.playerToken);
      setRoomCode(result.state.code);
      setJoinUrl(result.joinUrl || `${window.location.origin}/desktop?game=mahjong&room=${result.state.code}`);
      setMessage(action === "create" ? "Room ready. Friends can scan the QR code." : "Joined. Clear your board before everyone else.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not open the room.");
    } finally {
      setBusy(false);
    }
  }

  async function chooseTile(id: number) {
    if (!state || state.removedTileIds.includes(id) || busy) return;
    if (selected === null) {
      setSelected(id);
      return;
    }
    if (selected === id) {
      setSelected(null);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/local/mahjong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "match", code: state.code, playerToken, tileIds: [selected, id] })
      });
      const result = await response.json() as RoomResponse;
      if (!response.ok || !result.state) throw new Error(result.error || "Move was not accepted.");
      setState(result.state);
      setMessage(result.matched ? "Match found." : "Not a pair. Keep going.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Move was not accepted.");
    } finally {
      setSelected(null);
      setBusy(false);
    }
  }

  if (!state) {
    return (
      <section className={styles.gameScreen} aria-labelledby="mahjong-room-title">
        <header className={styles.gameHeader}>
          <button type="button" className={styles.iconButton} onClick={onBack} aria-label="Back to games"><ArrowLeft /></button>
          <div><h2 id="mahjong-room-title">Local Mahjong race</h2><p>Up to eight people on the same CareVoice network</p></div>
          <span />
        </header>
        <div className={styles.roomSetup}>
          <div className={styles.roomSetupCopy}><UsersRound /><h3>Play together, on your own screens.</h3><p>One person creates the room. Everyone else scans the QR code or enters its six-character code, then races to clear the same tile layout.</p></div>
          <div className={styles.roomForm}>
            <label>Your name<input value={playerName} maxLength={30} onChange={(event) => setPlayerName(event.target.value)} placeholder="Mei" /></label>
            <button type="button" onClick={() => void roomAction("create")} disabled={busy}>Create room and QR</button>
            <div className={styles.roomDivider}><span>or join a room</span></div>
            <label>Room code<input value={roomCode} maxLength={6} onChange={(event) => setRoomCode(event.target.value.toUpperCase())} placeholder="A1B2C3" /></label>
            <button type="button" className={styles.secondaryRoomAction} onClick={() => void roomAction("join")} disabled={busy || roomCode.length !== 6}>Join race</button>
          </div>
        </div>
        <div className={styles.gameMessage} role="status"><Sparkles />{message}</div>
      </section>
    );
  }

  const currentPlayer = state.players.find((player) => player.id === state.currentPlayerId);
  return (
    <section className={styles.gameScreen} aria-labelledby="mahjong-race-title">
      <header className={styles.gameHeader}>
        <button type="button" className={styles.iconButton} onClick={onBack} aria-label="Leave Mahjong room"><ArrowLeft /></button>
        <div><h2 id="mahjong-race-title">Mahjong room {state.code}</h2><p>{currentPlayer?.matches || 0} of {state.tiles.length / 2} pairs · {state.players.length} player{state.players.length === 1 ? "" : "s"}</p></div>
        <button type="button" className={styles.iconButton} onClick={() => setSelected(null)} aria-label="Clear selected tile"><RefreshCw /></button>
      </header>
      <div className={styles.raceLayout}>
        <div className={styles.mahjongScene}><div className={styles.mahjongTable}>{state.tiles.map((tile, index) => {
          const removed = state.removedTileIds.includes(tile.id);
          const tileStyle = { "--tile-lift": `${(index % 4) * 2}px`, "--tile-delay": `${index * 18}ms` } as CSSProperties;
          return <button key={tile.id} type="button" style={tileStyle} className={`${styles.mahjongTile} ${selected === tile.id ? styles.tileSelected : ""} ${removed ? styles.tileRemoved : ""}`} onClick={() => void chooseTile(tile.id)} disabled={removed || busy} aria-label={removed ? "Matched tile" : `Mahjong tile ${tile.face}`}><span>{tile.face}</span></button>;
        })}</div></div>
        <aside className={styles.raceSidebar}>
          <div className={styles.roomQr}><QRCodeSVG value={joinUrl} size={150} level="M" marginSize={1} /><strong><QrCode /> Room {state.code}</strong><p>Scan while connected to the same Wi-Fi.</p><button type="button" onClick={() => void navigator.clipboard.writeText(joinUrl)}><Copy /> Copy invite</button></div>
          <div className={styles.leaderboard}><h3><Trophy /> Live race</h3>{state.players.map((player, index) => <div key={player.id} className={player.id === state.currentPlayerId ? styles.currentPlayer : ""}><span>{index + 1}</span><strong>{player.name}</strong><small>{player.matches}/{state.tiles.length / 2}</small></div>)}</div>
        </aside>
      </div>
      <div className={styles.gameMessage} role="status"><Sparkles />{message}</div>
    </section>
  );
}