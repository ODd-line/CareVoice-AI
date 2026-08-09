import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { buildLocalSupportReply, generateSupportReply } from "@/lib/support-ai";

const supportRequestSchema = z.object({ message: z.string().trim().min(1).max(500) }).strict();
const requestWindows = new Map<string, { count: number; resetAt: number }>();
const noStore = { "Cache-Control": "no-store, max-age=0" };

function isRateLimited(key: string) {
  const now = Date.now();
  const current = requestWindows.get(key);
  if (!current || current.resetAt <= now) {
    requestWindows.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 15;
}

export async function POST(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(key)) return NextResponse.json({ error: "Too many support requests. Try again shortly." }, { status: 429, headers: noStore });
  if (Number(request.headers.get("content-length") || 0) > 4_096) return NextResponse.json({ error: "Request is too large." }, { status: 413, headers: noStore });
  const parsed = supportRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a support question under 500 characters." }, { status: 400, headers: noStore });
  const modelReply = await generateSupportReply(parsed.data.message);
  return NextResponse.json({ ...(modelReply || buildLocalSupportReply(parsed.data.message)), mode: modelReply ? "gemini-assisted" : "local-support-fallback" }, { headers: noStore });
}