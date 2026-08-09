"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roleHome, roleLabels, roleSummary, type UserRole } from "@/lib/roles";
import { useCareVoiceProfile } from "@/components/role-provider";

const roles: UserRole[] = ["patient", "family", "staff"];

const rolePeople: Record<UserRole, { image: string; alt: string; caption: string }> = {
  patient: {
    image: "/assets/role-patient.svg",
    alt: "Elderly patient receiving digital health support",
    caption: "For elderly patients and people managing daily care"
  },
  family: {
    image: "/assets/role-family.svg",
    alt: "Family caregiver supporting an older adult",
    caption: "For approved family members and caregivers"
  },
  staff: {
    image: "/assets/role-staff.svg",
    alt: "Hospital staff member in a clinical workspace",
    caption: "For verified nurses, doctors, and hospital teams"
  }
};

export default function HomePage() {
  const { status } = useSession();
  const { profile, setRole } = useCareVoiceProfile();

  async function chooseRole(role: UserRole) {
    try {
      await setRole(role);
      window.location.href = roleHome[role];
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not select this role.");
    }
  }

  return (
    <main className="min-h-screen healthcare-grid px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground">
            <HeartPulse className="h-4 w-4 text-primary" /> CareVoice Clinical Connect
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-normal text-foreground md:text-7xl">Voice-first triage for patients, families, and clinicians.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Sign in with Google, choose the right role, and CareVoice opens the dedicated workspace for that person.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {status === "unauthenticated" ? <Button size="lg" onClick={() => signIn("google")}>Sign in with Google</Button> : <Button size="lg" asChild><Link href={roleHome[profile.role]}>Open My Workspace</Link></Button>}
            <Button size="lg" variant="outline" asChild><Link href="/profile">Profile Settings</Link></Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = roleSummary[role].icon;
            const person = rolePeople[role];
            return (
              <Card key={role} className={profile.role === role ? "overflow-hidden border-primary shadow-md" : "overflow-hidden"}>
                <Image className="h-48 w-full object-cover" src={person.image} alt={person.alt} width={720} height={420} />
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Icon className="h-5 w-5" />
                    <span>{person.caption}</span>
                  </div>
                  <CardTitle>{roleLabels[role]}</CardTitle>
                  <CardDescription>{roleSummary[role].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant={profile.role === role ? "default" : "outline"} onClick={() => void chooseRole(role)}>
                    Choose {roleLabels[role]}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}