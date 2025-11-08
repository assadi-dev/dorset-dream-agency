import z from "zod";
import { AI_ACTIONS_VALUES } from "../../utils";

const aiActionKeys = Object.values(AI_ACTIONS_VALUES) as any;

export const askAISchema = z.object({
    selected: z.enum(aiActionKeys, { message: "action must be selected" }),
    content: z.string().min(1).max(200),
});

export type AskAISchemaInfer = z.infer<typeof askAISchema>;
