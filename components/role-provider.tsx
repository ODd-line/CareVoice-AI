"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { mockProfile } from "@/lib/mock-data";
import type { UserRole } from "@/lib/roles";

export type CareVoiceProfile = {
  role: UserRole;
  phone: string;
  emergencyContact: string;
  linkedPatient: string;
  setupComplete: boolean;
  whatsappNumber: string;
  whatsappConsent: boolean;
  preferredLanguage: "en-US" | "zh-HK";
};

type RoleContextValue = {
  profile: CareVoiceProfile;
  profileLoaded: boolean;
  setProfile: (profile: CareVoiceProfile) => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
};

const RoleContext = createContext<RoleContextValue | null>(null);

function profileKey(email?: string | null) {
  return `carevoice.profile.${email || "demo"}`;
}

function readCareVoiceProfile(value: unknown): CareVoiceProfile | null {
  if (!value || typeof value !== "object") return null;
  const profile = value as Partial<CareVoiceProfile>;
  if (!["patient", "family", "staff"].includes(String(profile.role))
    || typeof profile.phone !== "string"
    || typeof profile.emergencyContact !== "string"
    || typeof profile.linkedPatient !== "string") return null;

  return {
    role: profile.role as UserRole,
    phone: profile.phone,
    emergencyContact: profile.emergencyContact,
    linkedPatient: profile.linkedPatient,
    setupComplete: profile.setupComplete ?? true,
    whatsappNumber: profile.whatsappNumber ?? profile.phone,
    whatsappConsent: profile.whatsappConsent ?? false,
    preferredLanguage: profile.preferredLanguage === "zh-HK" ? "zh-HK" : "en-US"
  };
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { data: session, update } = useSession();
  const [profile, setProfileState] = useState<CareVoiceProfile>({
    role: mockProfile.role,
    phone: "",
    emergencyContact: "",
    linkedPatient: "",
    setupComplete: false,
    whatsappNumber: "",
    whatsappConsent: false,
    preferredLanguage: "en-US"
  });
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const sessionRole = session?.user?.role || "patient";
      try {
        const stored = window.localStorage.getItem(profileKey(session?.user?.email));
        const parsed: unknown = stored ? JSON.parse(stored) : null;
        const savedProfile = readCareVoiceProfile(parsed);
        if (savedProfile) {
          setProfileState({ ...savedProfile, role: sessionRole });
          setProfileLoaded(true);
          return;
        }
      } catch {
        window.localStorage.removeItem(profileKey(session?.user?.email));
      }
      setProfileState((current) => ({ ...current, role: sessionRole }));
      setProfileLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [session?.user?.email, session?.user?.role]);

  const setProfile = async (nextProfile: CareVoiceProfile) => {
    const updatedSession = await update({ role: nextProfile.role });
    const authorizedRole = updatedSession?.user?.role || session?.user?.role || "patient";
    if (authorizedRole !== nextProfile.role) {
      throw new Error("This account is not authorized for the selected role.");
    }
    const authorizedProfile = { ...nextProfile, role: authorizedRole };
    setProfileState(authorizedProfile);
    window.localStorage.setItem(profileKey(session?.user?.email), JSON.stringify(authorizedProfile));
  };

  const setRole = async (role: UserRole) => {
    await setProfile({ ...profile, role });
  };

  return <RoleContext.Provider value={{ profile, profileLoaded, setProfile, setRole }}>{children}</RoleContext.Provider>;
}

export function useCareVoiceProfile() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useCareVoiceProfile must be used inside RoleProvider");
  }
  return context;
}