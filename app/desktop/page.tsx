import type { Metadata } from "next";
import { CareVoiceDesktop } from "@/components/carevoice-desktop";

export const metadata: Metadata = {
  title: "CareVoice Home | Raspberry Pi",
  description: "The CareVoice home screen for care, connection, and games."
};

export default function DesktopPage() {
  return <CareVoiceDesktop />;
}