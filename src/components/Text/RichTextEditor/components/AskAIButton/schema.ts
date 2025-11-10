import z from "zod";
import { AI_ACTIONS_VALUES, PROMPT_INPUT_SIZE_LIMIT } from "../../utils";

const aiActionKeys = Object.values(AI_ACTIONS_VALUES) as any;

export const askAISchema = z.object({
    selected: z.enum(aiActionKeys, { message: "action must be selected" }),
    content: z.string().min(1).max(PROMPT_INPUT_SIZE_LIMIT),
});

export type AskAISchemaInfer = z.infer<typeof askAISchema>;
