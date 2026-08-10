import { beforeEach, describe, expect, it } from "vitest";
import { medicalProfessionalApplicationSchema } from "@/lib/medical-professional";
import { clearMedicalProfessionalApplicationsForTests, getMedicalProfessionalApplication, isApprovedMedicalProfessional, reviewMedicalProfessionalApplication, submitMedicalProfessionalApplication } from "@/lib/medical-professional-store";

const validApplication = {
  legalName: "Dr. Morgan Lee",
  profession: "doctor" as const,
  medicalRegistrationId: "MCHK-12345",
  licensingAuthority: "Medical Council of Hong Kong",
  hospital: "Queen Mary Hospital",
  department: "Internal Medicine",
  countryOrRegion: "Hong Kong",
  workEmail: "morgan.lee@hospital.example",
  workPhone: "+852 2123 4567",
  yearsExperience: 12,
  proofUrl: "https://hospital.example/staff/morgan-lee",
  professionalStatement: "I provide inpatient medical care and require CareVoice access for assigned ward patients.",
  attested: true as const
};

describe("medical professional applications", () => {
  beforeEach(() => clearMedicalProfessionalApplicationsForTests());

  it("requires detailed credentials and attestation", () => {
    expect(medicalProfessionalApplicationSchema.safeParse(validApplication).success).toBe(true);
    expect(medicalProfessionalApplicationSchema.safeParse({ ...validApplication, medicalRegistrationId: "" }).success).toBe(false);
    expect(medicalProfessionalApplicationSchema.safeParse({ ...validApplication, attested: false }).success).toBe(false);
  });

  it("binds review status to the signed-in account email", () => {
    submitMedicalProfessionalApplication("Applicant@Example.com", validApplication);
    expect(getMedicalProfessionalApplication("applicant@example.com")?.status).toBe("pending");
    expect(isApprovedMedicalProfessional("applicant@example.com")).toBe(false);

    reviewMedicalProfessionalApplication("applicant@example.com", "approved", "reviewer@hospital.example", "Registration checked.");
    expect(isApprovedMedicalProfessional("APPLICANT@example.com")).toBe(true);
  });
});