import "server-only";

import { randomUUID } from "node:crypto";
import type { MedicalApplicationStatus, MedicalProfessionalApplication, MedicalProfessionalApplicationInput } from "@/lib/medical-professional";
import { normalizeApplicationEmail } from "@/lib/medical-professional";

type ApplicationStore = Map<string, MedicalProfessionalApplication>;

const globalStore = globalThis as typeof globalThis & { careVoiceMedicalApplications?: ApplicationStore };
const applications = globalStore.careVoiceMedicalApplications ?? new Map<string, MedicalProfessionalApplication>();
globalStore.careVoiceMedicalApplications = applications;

export function submitMedicalProfessionalApplication(accountEmail: string, input: MedicalProfessionalApplicationInput) {
  const email = normalizeApplicationEmail(accountEmail);
  const existing = applications.get(email);
  if (existing?.status === "approved") throw new Error("This account is already approved for Medical Staff access.");
  const application: MedicalProfessionalApplication = {
    ...input,
    id: existing?.id || randomUUID(),
    accountEmail: email,
    status: "pending",
    submittedAt: new Date().toISOString()
  };
  applications.set(email, application);
  return application;
}

export function getMedicalProfessionalApplication(accountEmail: string) {
  return applications.get(normalizeApplicationEmail(accountEmail)) || null;
}

export function listMedicalProfessionalApplications() {
  return [...applications.values()].sort((left, right) => right.submittedAt.localeCompare(left.submittedAt));
}

export function reviewMedicalProfessionalApplication(accountEmail: string, status: Exclude<MedicalApplicationStatus, "pending">, reviewerEmail: string, reviewNote: string) {
  const email = normalizeApplicationEmail(accountEmail);
  const current = applications.get(email);
  if (!current) return null;
  const reviewed: MedicalProfessionalApplication = {
    ...current,
    status,
    reviewerEmail: normalizeApplicationEmail(reviewerEmail),
    reviewedAt: new Date().toISOString(),
    reviewNote: reviewNote.trim()
  };
  applications.set(email, reviewed);
  return reviewed;
}

export function isApprovedMedicalProfessional(accountEmail: string | null | undefined) {
  if (!accountEmail) return false;
  return getMedicalProfessionalApplication(accountEmail)?.status === "approved";
}

export function clearMedicalProfessionalApplicationsForTests() {
  applications.clear();
}