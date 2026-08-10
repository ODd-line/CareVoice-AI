export type AccessProfile = {
  id: string;
  name: string;
  role: string;
  language: string;
  display: string;
  input: string;
  familyConsent: string;
};

export const accessProfiles: Record<string, AccessProfile> = {
  "CV-7821": { id: "CV-7821", name: "Mei Wong", role: "Patient", language: "Cantonese / English", display: "High contrast", input: "Long-press guard", familyConsent: "Approved" },
  "CV-2044": { id: "CV-2044", name: "Nurse Lee", role: "Nurse", language: "Cantonese / English", display: "Standard", input: "Direct touch", familyConsent: "Care-team access" },
  "CV-3108": { id: "CV-3108", name: "Dr. Marcus Lee", role: "Doctor", language: "English / Cantonese", display: "Standard", input: "Direct touch", familyConsent: "Care-team access" },
  "CV-4492": { id: "CV-4492", name: "Ava Wong", role: "Family Member", language: "Cantonese / English", display: "Large text", input: "Direct touch", familyConsent: "Approved" }
};

export function normalizeCareVoiceId(value: string) {
  return value.trim().toUpperCase();
}

export function getAccessProfile(value: string) {
  return accessProfiles[normalizeCareVoiceId(value)] || null;
}