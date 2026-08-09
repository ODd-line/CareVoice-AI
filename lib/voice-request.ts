import { z } from "zod";

export const voiceAssistantRequestSchema = z.object({
  message: z.string().trim().max(2_000),
  personId: z.string().trim().min(1).max(100).default("patient-mei-wong")
}).strict();