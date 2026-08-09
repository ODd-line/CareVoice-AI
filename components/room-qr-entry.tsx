"use client";

import { useRef, useState } from "react";
import { Camera, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue: string }>>;
};

type BarcodeWindow = Window & {
  BarcodeDetector?: new (options: { formats: string[] }) => BarcodeDetectorInstance;
};

function getSafeRoomPath(value: string) {
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin || !url.pathname.startsWith("/room/")) return null;
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

export function RoomQrEntry() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [roomLink, setRoomLink] = useState("");
  const [status, setStatus] = useState("");

  function openRoom(value: string) {
    const safePath = getSafeRoomPath(value.trim());
    if (!safePath) {
      setStatus("Use a CareVoice room QR or signed room link from this site.");
      return;
    }
    window.location.assign(safePath);
  }

  async function scanImage(file: File | undefined) {
    if (!file) return;
    const Detector = (window as BarcodeWindow).BarcodeDetector;
    if (!Detector) {
      setStatus("QR decoding is unavailable in this browser. Paste the signed room link instead.");
      return;
    }

    try {
      setStatus("Reading QR code...");
      const bitmap = await createImageBitmap(file);
      const results = await new Detector({ formats: ["qr_code"] }).detect(bitmap);
      bitmap.close();
      const value = results[0]?.rawValue;
      if (!value) {
        setStatus("No QR code was found. Try a clearer image or paste the room link.");
        return;
      }
      openRoom(value);
    } catch {
      setStatus("The QR image could not be read. Paste the signed room link instead.");
    }
  }

  return (
    <div className="space-y-2 rounded-md border bg-background p-3 text-left">
      <input ref={fileInput} className="hidden" type="file" accept="image/*" capture="environment" onChange={(event) => void scanImage(event.target.files?.[0])} />
      <Button className="w-full" type="button" variant="outline" onClick={() => fileInput.current?.click()}><Camera className="h-4 w-4" /> Scan room QR</Button>
      <div className="flex gap-2"><Input value={roomLink} onChange={(event) => setRoomLink(event.target.value)} placeholder="Paste signed room link" aria-label="Signed CareVoice room link" /><Button type="button" size="icon" onClick={() => openRoom(roomLink)} aria-label="Open signed room link"><QrCode className="h-4 w-4" /></Button></div>
      {status ? <p className="text-xs text-muted-foreground" role="status">{status}</p> : null}
    </div>
  );
}