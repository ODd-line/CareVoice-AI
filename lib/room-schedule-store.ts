import "server-only";

import { randomUUID } from "node:crypto";

export type RoomScheduleEntry = {
  id: string;
  title: string;
  start: string;
  end: string;
  kind: "clinical" | "appointment-request";
  status: "confirmed" | "requested";
  createdBy: string;
};

const initialEntries: RoomScheduleEntry[] = [
  { id: "medication-review", title: "Medication review", start: "2026-08-10T09:00:00+08:00", end: "2026-08-10T09:30:00+08:00", kind: "clinical", status: "confirmed", createdBy: "doctor@carevoice.health" },
  { id: "physiotherapy", title: "Physiotherapy", start: "2026-08-10T14:00:00+08:00", end: "2026-08-10T14:45:00+08:00", kind: "clinical", status: "confirmed", createdBy: "doctor@carevoice.health" }
];

const roomSchedules = new Map<string, RoomScheduleEntry[]>();

function scheduleFor(roomId: string) {
  if (!roomSchedules.has(roomId)) roomSchedules.set(roomId, initialEntries.map((entry) => ({ ...entry })));
  return roomSchedules.get(roomId) as RoomScheduleEntry[];
}

export function listRoomSchedule(roomId: string) {
  return scheduleFor(roomId).map((entry) => ({ ...entry }));
}

export function requestRoomAppointment(roomId: string, input: Omit<RoomScheduleEntry, "id" | "kind" | "status">) {
  const entry: RoomScheduleEntry = { ...input, id: randomUUID(), kind: "appointment-request", status: "requested" };
  scheduleFor(roomId).push(entry);
  return { ...entry };
}

export function updateRoomTimetable(roomId: string, entryId: string, update: Pick<RoomScheduleEntry, "title" | "start" | "end">) {
  const entry = scheduleFor(roomId).find((candidate) => candidate.id === entryId && candidate.kind === "clinical");
  if (!entry) return null;
  Object.assign(entry, update);
  return { ...entry };
}