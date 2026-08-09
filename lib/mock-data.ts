import type { UserRole } from "@/lib/roles";

export type CareVoiceGender = "female" | "male";

export type CareVoicePerson = {
  id: string;
  name: string;
  role: "patient" | "nurse" | "doctor" | "family";
  gender: CareVoiceGender;
  preferredVoice: "female" | "male";
  language: "en-US" | "zh-HK";
  roomId: string;
  phone: string;
};

export const mockProfile = {
  name: "CareVoice Demo User",
  email: "demo@carevoice.health",
  image: "",
  role: "patient" as UserRole,
  phone: "+852 6123 4567",
  emergencyContact: "Ava Wong, Daughter, +852 9234 1000",
  linkedPatient: "Mrs. Mei Lin Wong"
};

export const careVoicePeople: CareVoicePerson[] = [
  {
    id: "patient-mei-wong",
    name: "Mrs. Mei Lin Wong",
    role: "patient",
    gender: "female",
    preferredVoice: "female",
    language: "zh-HK",
    roomId: "CV-ROOM-WONG-7821",
    phone: "+852 6123 4567"
  },
  {
    id: "patient-kwok-chan",
    name: "Mr. Kwok Chan",
    role: "patient",
    gender: "male",
    preferredVoice: "male",
    language: "zh-HK",
    roomId: "CV-ROOM-CHAN-4180",
    phone: "+852 6876 3001"
  },
  {
    id: "nurse-chloe-lau",
    name: "Nurse Chloe Lau",
    role: "nurse",
    gender: "female",
    preferredVoice: "female",
    language: "en-US",
    roomId: "CV-ROOM-WONG-7821",
    phone: "+852 2255 1001"
  },
  {
    id: "doctor-marcus-lee",
    name: "Dr. Marcus Lee",
    role: "doctor",
    gender: "male",
    preferredVoice: "male",
    language: "en-US",
    roomId: "CV-ROOM-WONG-7821",
    phone: "+852 2255 2002"
  },
  {
    id: "family-ava-wong",
    name: "Ava Wong",
    role: "family",
    gender: "female",
    preferredVoice: "female",
    language: "en-US",
    roomId: "CV-ROOM-WONG-7821",
    phone: "+852 9234 1000"
  },
  {
    id: "family-daniel-chan",
    name: "Daniel Chan",
    role: "family",
    gender: "male",
    preferredVoice: "male",
    language: "en-US",
    roomId: "CV-ROOM-CHAN-4180",
    phone: "+852 9345 2000"
  }
];

export const careVoiceRooms = [
  {
    id: "CV-ROOM-WONG-7821",
    patientId: "patient-mei-wong",
    ward: "Ward A · Bed 12",
    diagnosisContext: "Post-fall monitoring, hypertension, knee pain",
    consent: "Family updates approved, staff-only notes restricted",
    memberIds: ["patient-mei-wong", "nurse-chloe-lau", "doctor-marcus-lee", "family-ava-wong"]
  },
  {
    id: "CV-ROOM-CHAN-4180",
    patientId: "patient-kwok-chan",
    ward: "Ward C · Bed 08",
    diagnosisContext: "Medication adherence, dizziness watch, diabetes review",
    consent: "Family reminders approved, eHRSS export pending",
    memberIds: ["patient-kwok-chan", "doctor-marcus-lee", "family-daniel-chan"]
  }
];

export const careVoiceVoiceProfiles = careVoicePeople.map((person) => ({
  personId: person.id,
  label: `${person.name} (${person.gender})`,
  gender: person.gender,
  preferredVoice: person.preferredVoice,
  language: person.language
}));

export const patientSchedule = [
  { time: "8:00 AM", task: "Take Blue Pill", detail: "With warm water", icon: "pill" },
  { time: "10:00 AM", task: "Physiotherapy", detail: "Knee stretches", icon: "activity" },
  { time: "12:30 PM", task: "Lunch + Blood Pressure", detail: "Record before meal", icon: "heart" },
  { time: "6:00 PM", task: "Family Call", detail: "Video check-in", icon: "phone" }
];

const calendarBaseDate = new Date();

export const patientCalendarEvents = [
  {
    title: "Take Blue Pill",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 8, 0),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 8, 15)
  },
  {
    title: "Physiotherapy",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 10, 0),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 10, 45)
  },
  {
    title: "Family Visit",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 18, 0),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 19, 0)
  }
];

export const familyCalendarEvents = [
  ...patientCalendarEvents,
  {
    title: "Hospital Follow-up Call",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 1, 11, 30),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 1, 12, 0)
  },
  {
    title: "Caregiver Visit Window",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 2, 17, 30),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 2, 19, 0)
  }
];

export const staffCalendarEvents = [
  {
    title: "Ward A Shift",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 8, 0),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate(), 16, 0)
  },
  {
    title: "Mrs. Wong Surgery Prep",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 1, 7, 30),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 1, 9, 0)
  },
  {
    title: "Post-op Voice Check Review",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 1, 14, 0),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 1, 14, 30)
  },
  {
    title: "Discharge Handoff Round",
    start: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 2, 10, 0),
    end: new Date(calendarBaseDate.getFullYear(), calendarBaseDate.getMonth(), calendarBaseDate.getDate() + 2, 11, 0)
  }
];

export const voiceLogs = [
  { time: "Today, 9:20 AM", summary: "Mild knee pain, mood calm", vitals: "BP 128/78, HR 76" },
  { time: "Yesterday, 7:10 PM", summary: "Completed medication, slept better", vitals: "BP 122/75, HR 72" },
  { time: "Mon, 8:05 AM", summary: "Dizziness mentioned once", vitals: "BP 136/82, HR 80" }
];

export const familyAlerts = [
  { level: "urgent", title: "Missed medication", detail: "Blue pill was not confirmed by 8:30 AM." },
  { level: "watch", title: "Fall-risk phrase detected", detail: "Voice note mentioned 'felt unstable' yesterday evening." },
  { level: "ok", title: "Mood improving", detail: "Last two check-ins were calm and positive." }
];

export const familyMessages = [
  { from: "Patient", time: "9:20 AM", text: "My knee feels better after stretching." },
  { from: "Ava", time: "9:32 AM", text: "Great. I will visit after work today." }
];

export const triagePatients = [
  { name: "Mrs. Mei Lin Wong", age: 78, gender: "Female", roomId: "CV-ROOM-WONG-7821", assignedNurse: "Nurse Chloe Lau", assignedDoctor: "Dr. Marcus Lee", urgency: "Red", reason: "Chest pressure in voice log", lastCheckIn: "18 min ago", score: 94 },
  { name: "Mr. Kwok Chan", age: 83, gender: "Male", roomId: "CV-ROOM-CHAN-4180", assignedNurse: "Nurse Chloe Lau", assignedDoctor: "Dr. Marcus Lee", urgency: "Yellow", reason: "Missed medication", lastCheckIn: "1 hr ago", score: 71 },
  { name: "Ms. Lai Ho", age: 74, gender: "Female", roomId: "CV-ROOM-HO-2098", assignedNurse: "Nurse Chloe Lau", assignedDoctor: "Dr. Marcus Lee", urgency: "Green", reason: "Stable vitals", lastCheckIn: "35 min ago", score: 22 },
  { name: "Mr. Peter Yu", age: 80, gender: "Male", roomId: "CV-ROOM-YU-7712", assignedNurse: "Nurse Chloe Lau", assignedDoctor: "Dr. Marcus Lee", urgency: "Yellow", reason: "Sleep disruption", lastCheckIn: "2 hrs ago", score: 64 }
];

export const staffRoster = [
  { day: "Mon", shift: "Ward A, 08:00-16:00", appointments: "6 voice-log reviews" },
  { day: "Tue", shift: "Teletriage, 10:00-18:00", appointments: "12 remote consults" },
  { day: "Wed", shift: "Ward B, 08:00-16:00", appointments: "4 high-risk follow-ups" },
  { day: "Thu", shift: "Clinical admin, 12:00-20:00", appointments: "FHIR export audit" }
];

export const hospitalOpsMetrics = [
  { label: "Ward Capacity", value: "92%", detail: "3 discharge-ready beds need family handoff." },
  { label: "Pending eHRSS Consent", value: "7", detail: "Patients need consent before record export." },
  { label: "Unclosed Handoffs", value: "5", detail: "Nurse-to-doctor escalations missing acknowledgement." },
  { label: "Interpreter Needed", value: "4", detail: "Cantonese/English summaries queued for review." }
];

export const hospitalWorkflowGaps = [
  { title: "Discharge Readiness", detail: "Combines medication confirmation, family pickup time, follow-up appointment, and discharge note status." },
  { title: "Consent and Audit Trail", detail: "Shows whether voice logs can be shared with family, exported to eHRSS, or restricted to hospital staff." },
  { title: "Shift Handoff", detail: "Tracks unresolved Red/Yellow patients across nurse, doctor, and family communication handoffs." }
];

export const secureCareRoom = {
  id: "CV-ROOM-WONG-7821",
  patient: "Mrs. Mei Lin Wong",
  ward: "Ward A · Bed 12",
  encryption: "Authenticated access with a short-lived, server-signed room invitation.",
  assignedTeam: [
    { name: "Mrs. Mei Lin Wong", role: "Patient", gender: "female", voice: "Female voice", access: "Own schedule, approved summaries, voice check-ins" },
    { name: "Queen Mary Ward A", role: "Hospital Team", gender: "female", voice: "Female voice", access: "Room membership, care handoff, read-only clinical timetable" },
    { name: "Dr. Marcus Lee", role: "Doctor", gender: "male", voice: "Male voice", access: "Clinical notes, triage priority, surgery/discharge plan" },
    { name: "Ava Wong", role: "Family Member", gender: "female", voice: "Female voice", access: "Appointment requests, approved summaries, emergency alerts" }
  ],
  privacyRules: [
    "Only the named signed-in recipient with the intended role can use an unexpired invitation.",
    "Family sees approved updates, not full staff-only notes.",
    "Sensitive records require server-side authorization and managed encryption at rest.",
    "Room invites expire after ten minutes and should be revoked after staff changes."
  ]
};