import { describe, expect, it } from "vitest";
import { canPortalRoleUseRoomRole, getPortalRoleForRoomRole, getRoomCapabilities } from "@/lib/room-access";

describe("secure room role policy", () => {
  it("allows only doctors to modify the clinical timetable", () => {
    expect(getRoomCapabilities("doctor").modifyTimetable).toBe(true);
    expect(getRoomCapabilities("hospital").modifyTimetable).toBe(false);
    expect(getRoomCapabilities("family").modifyTimetable).toBe(false);
    expect(getRoomCapabilities("patient").modifyTimetable).toBe(false);
  });

  it("allows family members to request appointments without timetable access", () => {
    expect(getRoomCapabilities("family").scheduleAppointments).toBe(true);
    expect(getRoomCapabilities("family").modifyTimetable).toBe(false);
  });

  it("binds room roles to compatible signed portal roles", () => {
    expect(canPortalRoleUseRoomRole("staff", "doctor")).toBe(true);
    expect(canPortalRoleUseRoomRole("staff", "hospital")).toBe(true);
    expect(canPortalRoleUseRoomRole("family", "doctor")).toBe(false);
    expect(canPortalRoleUseRoomRole("family", "family")).toBe(true);
    expect(canPortalRoleUseRoomRole("patient", "family")).toBe(false);
    expect(getPortalRoleForRoomRole("doctor")).toBe("staff");
    expect(getPortalRoleForRoomRole("hospital")).toBe("staff");
  });
});