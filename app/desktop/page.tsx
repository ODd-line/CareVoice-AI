import type { Metadata } from "next";
import { CareVoiceDesktop } from "@/components/carevoice-desktop";

export const metadata: Metadata = {
  title: "CareVoice Home | Raspberry Pi",
  description: "The CareVoice home screen for care, connection, and games."
};

type DesktopPageProps = {
  searchParams: Promise<{ game?: string; room?: string; pair?: string }>;
};

export default async function DesktopPage({ searchParams }: DesktopPageProps) {
  const params = await searchParams;
  const initialApp = params.game === "mahjong" ? "mahjong" : params.pair ? "settings" : "home";
  return <CareVoiceDesktop initialApp={initialApp} initialRoomCode={(params.room || "").toUpperCase()} />;
}