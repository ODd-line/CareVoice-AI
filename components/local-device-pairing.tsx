"use client";

import { useEffect, useState } from "react";
import { Link2, QrCode, ShieldCheck, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import styles from "./carevoice-desktop.module.css";

type Pairing = { code: string; patientName: string; doctorName: string; deviceLabel: string | null; status: "waiting" | "linked" };

export function LocalDevicePairing() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [pairing, setPairing] = useState<Pairing | null>(null);
  const [pairingUrl, setPairingUrl] = useState("");
  const [message, setMessage] = useState("Pairing is available only through this local CareVoice hub.");

  useEffect(() => {
    if (!pairing || pairing.status === "linked") return;
    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/local/device-pairing?code=${pairing.code}`, { cache: "no-store" });
      if (!response.ok) return;
      const result = await response.json() as { pairing?: Pairing };
      if (result.pairing) setPairing(result.pairing);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [pairing]);

  async function createPairing() {
    const response = await fetch("/api/local/device-pairing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", patientName, doctorName })
    });
    const result = await response.json() as { pairing?: Pairing; pairingUrl?: string; error?: string };
    if (!response.ok || !result.pairing) {
      setMessage(result.error || "Could not create the device link.");
      return;
    }
    setPairing(result.pairing);
    setPairingUrl(result.pairingUrl || "");
    setMessage("Open the native CareVoice app and scan this code within 15 minutes.");
  }

  return (
    <div className={styles.pairingPanel}>
      <div className={styles.pairingHeading}><span><Link2 /></span><div><h2>Link bedside controller</h2><p>Bind this controller to one patient and their assigned doctor through the local hub.</p></div></div>
      {pairing ? (
        <div className={styles.pairingReady}>
          <div>{pairingUrl ? <QRCodeSVG value={pairingUrl} size={154} level="M" marginSize={1} /> : <QrCode />}</div>
          <section><small>{pairing.status === "linked" ? "Device linked" : "Single-use pairing code"}</small><strong>{pairing.code}</strong><p>{pairing.patientName} <span>to</span> {pairing.doctorName}</p>{pairing.status === "linked" ? <em><ShieldCheck /> {pairing.deviceLabel} is connected</em> : <em><Smartphone /> Waiting for the native app</em>}</section>
        </div>
      ) : (
        <div className={styles.pairingForm}>
          <label>Patient name<input value={patientName} onChange={(event) => setPatientName(event.target.value)} placeholder="Mrs Mei Wong" /></label>
          <label>Assigned doctor<input value={doctorName} onChange={(event) => setDoctorName(event.target.value)} placeholder="Dr Marcus Lee" /></label>
          <button type="button" onClick={() => void createPairing()} disabled={patientName.trim().length < 2 || doctorName.trim().length < 2}><Link2 /> Create local device link</button>
        </div>
      )}
      <p className={styles.pairingStatus} role="status">{pairing?.status === "linked" ? `Connected to ${pairing.deviceLabel}. Care requests now carry the patient and doctor link.` : message}</p>
    </div>
  );
}