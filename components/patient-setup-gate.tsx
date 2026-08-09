"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCareVoiceProfile } from "@/components/role-provider";

export function PatientSetupGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, profileLoaded } = useCareVoiceProfile();
  const isSetupPage = pathname === "/patient/setup";

  useEffect(() => {
    if (!profileLoaded) return;
    if (!profile.setupComplete && !isSetupPage) router.replace("/patient/setup");
    if (profile.setupComplete && isSetupPage) return;
  }, [isSetupPage, profile.setupComplete, profileLoaded, router]);

  if (!profileLoaded || (!profile.setupComplete && !isSetupPage)) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Preparing your CareVoice account...</div>;
  }

  return children;
}