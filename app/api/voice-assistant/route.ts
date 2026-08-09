import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { careVoicePeople } from "@/lib/mock-data";
import { auth } from "@/auth";
import { generateCareVoiceReply, type CareVoiceReply } from "@/lib/carevoice-ai";
import { voiceAssistantRequestSchema } from "@/lib/voice-request";

const requestWindows = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(userId: string) {
  const now = Date.now();
  const current = requestWindows.get(userId);
  if (!current || current.resetAt <= now) {
    requestWindows.set(userId, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 20;
}
function buildCareVoiceReply(message: string): CareVoiceReply {
  const text = message.toLowerCase();

  if (/chest|breath|faint|跌|暈|胸|呼吸|倒/.test(text)) {
    return {
      urgency: "red",
      reply: "I hear a possible urgent symptom. I am alerting your care team. If you have chest pain, breathing trouble, fainting, or feel unsafe, call emergency help now.",
      actions: ["Call emergency contact", "Notify assigned nurse", "Create urgent voice log"]
    };
  }

  if (/medicine|pill|藥|medication|dose|blood pressure/.test(text)) {
    return {
      urgency: "yellow",
      reply: "I can help record that medication question. Please do not change dose by yourself. I will mark this for your assigned nurse or doctor to review.",
      actions: ["Save medication question", "Remind family", "Add nurse review"]
    };
  }

  if (/visit|appointment|calendar|doctor|surgery|手術|覆診/.test(text)) {
    return {
      urgency: "green",
      reply: "Your calendar has medicine, family visits, hospital follow-ups, and surgery-related appointments. I can read the next appointment or help add a family visit reminder.",
      actions: ["Read next appointment", "Share with family", "Open calendar"]
    };
  }

  return {
    urgency: "green",
    reply: "I am CareVoice. I can listen to how you feel, record symptoms, remind you about medicine, explain your calendar, and contact family or the care team when needed.",
    actions: ["Save voice note", "Ask follow-up", "Share approved summary"]
  };
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (isRateLimited(session.user.id)) {
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }
  if (Number(request.headers.get("content-length") || 0) > 8_192) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  const parsed = voiceAssistantRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Malformed voice assistant request." }, { status: 400 });
  }
  const { message, personId } = parsed.data;
  const person = careVoicePeople.find((item) => item.id === personId);

  if (!person) {
    return NextResponse.json({ error: "Unknown voice profile." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ urgency: "green", reply: "Press the microphone and tell CareVoice how you feel today.", actions: ["Start listening"] });
  }

  const localReply = buildCareVoiceReply(message);
  const modelReply = localReply.urgency === "red" ? null : await generateCareVoiceReply(message, person.language);

  return NextResponse.json({
    ...(modelReply || localReply),
    speaker: {
      personId: person.id,
      name: person.name,
      gender: person.gender,
      preferredVoice: person.preferredVoice,
      language: person.language
    },
    modelMode: modelReply ? "gemini-assisted" : "local-safety-fallback",
    safetyMode: localReply.urgency === "red" ? "deterministic-urgent-rule" : "structured-human-review"
  });
}