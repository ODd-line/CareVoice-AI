import type { UserRole } from "@/lib/roles";

export const roomMemberRoles = ["patient", "family", "doctor", "hospital"] as const;

export type RoomMemberRole = (typeof roomMemberRoles)[number];

export type RoomCapabilities = {
  viewRoom: boolean;
  modifyTimetable: boolean;
  scheduleAppointments: boolean;
  manageMembers: boolean;
};

const roomCapabilities: Record<RoomMemberRole, RoomCapabilities> = {
  patient: { viewRoom: true, modifyTimetable: false, scheduleAppointments: false, manageMembers: false },
  family: { viewRoom: true, modifyTimetable: false, scheduleAppointments: true, manageMembers: false },
  doctor: { viewRoom: true, modifyTimetable: true, scheduleAppointments: true, manageMembers: true },
  hospital: { viewRoom: true, modifyTimetable: false, scheduleAppointments: false, manageMembers: true }
};

export function isRoomMemberRole(value: unknown): value is RoomMemberRole {
  return roomMemberRoles.includes(value as RoomMemberRole);
}

export function canPortalRoleUseRoomRole(portalRole: UserRole, roomRole: RoomMemberRole) {
  if (roomRole === "patient") return portalRole === "patient";
  if (roomRole === "family") return portalRole === "family";
  return portalRole === "staff";
}

export function getPortalRoleForRoomRole(roomRole: RoomMemberRole): UserRole {
  if (roomRole === "patient" || roomRole === "family") return roomRole;
  return "staff";
}

export function getRoomCapabilities(roomRole: RoomMemberRole): RoomCapabilities {
  return roomCapabilities[roomRole];
}