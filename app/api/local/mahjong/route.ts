import { NextResponse } from "next/server";
import { z } from "zod";
import { getLocalJoinOrigin, isLocalApplianceRequest } from "@/lib/local-appliance";
import { createMahjongRoom, getMahjongRoom, joinMahjongRoom, submitMahjongMatch } from "@/lib/mahjong-rooms";

const playerName = z.string().trim().min(1).max(30);
const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("create"), playerName }).strict(),
  z.object({ action: z.literal("join"), code: z.string().trim().length(6), playerName }).strict(),
  z.object({ action: z.literal("match"), code: z.string().trim().length(6), playerToken: z.string().min(10).max(100), tileIds: z.tuple([z.number().int(), z.number().int()]) }).strict()
]);

function localOnly(request: Request) {
  return isLocalApplianceRequest(request) ? null : NextResponse.json({ error: "Mahjong rooms are available only on the local CareVoice hub." }, { status: 403 });
}

export async function GET(request: Request) {
  const denied = localOnly(request);
  if (denied) return denied;
  const url = new URL(request.url);
  const state = getMahjongRoom(url.searchParams.get("code") || "", url.searchParams.get("playerToken") || "");
  return state ? NextResponse.json({ state }) : NextResponse.json({ error: "Room or player session not found." }, { status: 404 });
}

export async function POST(request: Request) {
  const denied = localOnly(request);
  if (denied) return denied;
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Check the Mahjong room details and try again." }, { status: 400 });
  try {
    if (parsed.data.action === "create") {
      const room = createMahjongRoom(parsed.data.playerName);
      return NextResponse.json({ ...room, joinUrl: `${getLocalJoinOrigin(request)}/desktop?game=mahjong&room=${room.state.code}` });
    }
    if (parsed.data.action === "join") {
      const room = joinMahjongRoom(parsed.data.code, parsed.data.playerName);
      return room ? NextResponse.json(room) : NextResponse.json({ error: "That local room was not found." }, { status: 404 });
    }
    const result = submitMahjongMatch(parsed.data.code, parsed.data.playerToken, parsed.data.tileIds);
    return result ? NextResponse.json(result) : NextResponse.json({ error: "Room or player session not found." }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update the Mahjong room." }, { status: 409 });
  }
}