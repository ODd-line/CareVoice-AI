import { z } from "zod";

export const medicalProfessionValues = ["doctor", "nurse", "pharmacist", "allied-health", "hospital-administration"] as const;
export const medicalProfessionLabels: Record<(typeof medicalProfessionValues)[number], string> = {
  doctor: "Doctor",
  nurse: "Nurse",
  pharmacist: "Pharmacist",
  "allied-health": "Allied Health Professional",
  "hospital-administration": "Hospital Administrator"
};

export const medicalProfessionalApplicationSchema = z.object({
  legalName: z.string().trim().min(2).max(100),
  profession: z.enum(medicalProfessionValues),
  medicalRegistrationId: z.string().trim().min(3).max(80),
  licensingAuthority: z.string().trim().min(2).max(120),
  hospital: z.string().trim().min(2).max(160),
  department: z.string().trim().min(2).max(120),
  countryOrRegion: z.string().trim().min(2).max(100),
  workEmail: z.email().max(254),
  workPhone: z.string().trim().min(7).max(30),
  yearsExperience: z.coerce.number().int().min(0).max(70),
  proofUrl: z.url().max(500),
  professionalStatement: z.string().trim().min(40).max(1200),
  attested: z.literal(true)
}).strict();

export type MedicalProfessionalApplicationInput = z.infer<typeof medicalProfessionalApplicationSchema>;
export type MedicalApplicationStatus = "pending" | "approved" | "rejected";

export type MedicalProfessionalApplication = MedicalProfessionalApplicationInput & {
  id: string;
  accountEmail: string;
  status: MedicalApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerEmail?: string;
  reviewNote?: string;
};

export function normalizeApplicationEmail(value: string) {
  return value.trim().toLowerCase();
}