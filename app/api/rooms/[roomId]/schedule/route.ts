import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRoomCapabilities } from "@/lib/room-access";
import { getVerifiedRoomInvite } from "@/lib/room-invites";
import { listRoomSchedule, requestRoomAppointment, updateRoomTimetable } from "@/lib/room-schedule-store";

type RouteContext = { params: Promise<{ roomId: string }> };
const noStore = { "Cache-Control": "no-store, max-age=0" };

function readScheduleInput(body: Record<string, unknown>) {
  const title = String(body.title || "").trim();
  const start = String(body.start || "");
  const end = String(body.end || "");
  const startTime = Date.parse(start);
  const endTime = Date.parse(end);
  if (!title || title.length > 120 || !Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime <= startTime) return null;
  return { title, start: new Date(startTime).toISOString(), end: new Date(endTime).toISOString() };
}

async function authorize(roomId: string, token: string | undefined) {
  const session = await auth();
  if (!session?.user) return { error: NextResponse.json({ error: "Authentication required." }, { status: 401, headers: noStore }) };
  const invite = getVerifiedRoomInvite(token, roomId, session.user.email || "", session.user.role);
  if (!invite) return { error: NextResponse.json({ error: "A valid signed room invitation is required." }, { status: 403, headers: noStore }) };
  return { session, invite, capabilities: getRoomCapabilities(invite.roomRole) };
}

export async function GET(request: Request, { params }: RouteContext) {
  const { roomId } = await params;
  const token = new URL(request.url).searchParams.get("token") || undefined;
  const access = await authorize(roomId, token);
  if (access.error) return access.error;
  return NextResponse.json({ entries: listRoomSchedule(roomId), roomRole: access.invite?.roomRole, capabilities: access.capabilities }, { headers: noStore });
}

export async function POST(request: Request, { params }: RouteContext) {
  const { roomId } = await params;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const access = await authorize(roomId, String(body.token || "") || undefined);
  if (access.error) return access.error;
  if (!access.capabilities?.scheduleAppointments) return NextResponse.json({ error: "This room role cannot schedule appointments." }, { status: 403, headers: noStore });
  const input = readScheduleInput(body);
  if (!input) return NextResponse.json({ error: "Provide a title and a valid start/end time." }, { status: 400, headers: noStore });
  const entry = requestRoomAppointment(roomId, { ...input, createdBy: access.session?.user.email || "room-member" });
  return NextResponse.json({ entry }, { status: 201, headers: noStore });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { roomId } = await params;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const access = await authorize(roomId, String(body.token || "") || undefined);
  if (access.error) return access.error;
  if (!access.capabilities?.modifyTimetable) return NextResponse.json({ error: "Only the assigned doctor can modify the clinical timetable." }, { status: 403, headers: noStore });
  const input = readScheduleInput(body);
  const entryId = String(body.entryId || "");
  if (!input || !entryId) return NextResponse.json({ error: "Provide an event and valid title/start/end time." }, { status: 400, headers: noStore });
  const entry = updateRoomTimetable(roomId, entryId, input);
  if (!entry) return NextResponse.json({ error: "Clinical timetable entry not found." }, { status: 404, headers: noStore });
  return NextResponse.json({ entry }, { headers: noStore });
}