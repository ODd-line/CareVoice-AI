import {
  Activity,
  BellRing,
  Bot,
  CalendarDays,
  ClipboardList,
  Gamepad2,
  HeartPulse,
  Home,
  Hospital,
  MessageSquareText,
  NotebookPen,
  PhoneCall,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound
} from "lucide-react";

export type UserRole = "patient" | "family" | "staff";

export type NavItem = {
  title: string;
  href: string;
  icon: typeof Home;
};

export const roleLabels: Record<UserRole, string> = {
  patient: "Patient",
  family: "Family Member",
  staff: "Medical Staff"
};

export const roleHome: Record<UserRole, string> = {
  patient: "/patient/dashboard",
  family: "/family/dashboard",
  staff: "/staff/dashboard"
};

export const roleNav: Record<UserRole, NavItem[]> = {
  patient: [
    { title: "Home", href: "/patient/dashboard", icon: Home },
    { title: "Micro Hub", href: "/patient/micro", icon: Gamepad2 },
    { title: "Voice Assistant", href: "/patient/voice-assistant", icon: Bot },
    { title: "My Schedule", href: "/patient/schedule", icon: CalendarDays },
    { title: "My Health", href: "/patient/health", icon: HeartPulse },
    { title: "Call for Help", href: "/patient/help", icon: PhoneCall }
  ],
  family: [
    { title: "Dashboard", href: "/family/dashboard", icon: Activity },
    { title: "Patient Profile", href: "/family/patient", icon: UserRound },
    { title: "Schedule", href: "/family/schedule", icon: CalendarDays },
    { title: "Messages", href: "/family/messages", icon: MessageSquareText },
    { title: "Settings", href: "/profile", icon: Settings }
  ],
  staff: [
    { title: "Triage Queue", href: "/staff/dashboard", icon: ClipboardList },
    { title: "Patient Roster", href: "/staff/patients", icon: UsersRound },
    { title: "My Shift Schedule", href: "/staff/schedule", icon: CalendarDays },
    { title: "Clinical Notes", href: "/staff/notes", icon: NotebookPen },
    { title: "Admin", href: "/staff/admin", icon: Hospital }
  ]
};

export const roleSummary: Record<UserRole, { icon: typeof Home; title: string; description: string }> = {
  patient: {
    icon: ShieldCheck,
    title: "Elder-friendly care mode",
    description: "Large controls, voice-first logging, daily schedule, and emergency help."
  },
  family: {
    icon: BellRing,
    title: "Caregiver monitoring mode",
    description: "Patient status, alerts, shared timetable, and family communications."
  },
  staff: {
    icon: Hospital,
    title: "Clinical triage mode",
    description: "AI urgency queue, patient roster, shift schedule, and clinical actions."
  }
};