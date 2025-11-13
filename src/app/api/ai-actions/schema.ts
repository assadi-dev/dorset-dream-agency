import { z } from "zod";

export const ChatConversationSchema = z.object({
    role: z.enum(["system", "user", "assistant"]),
    content: z.string(),
});

export const requestBodySchema = z.object({
    action: z.enum(["resume", "describe", "rephrase", "correct"]),
    prompt: z.string().min(1).max(255),
    chat: z.array(ChatConversationSchema),
});

const OPEN_ROUTER_ROLE = ["user", "assistant", "system"];

export const OpenRouterMessageSchema = z.object({
    role: z.enum(OPEN_ROUTER_ROLE as any),
    content: z.string(),
});

export const OpenRouterBodySchema = z.object({
    name: z.string().optional().nullable(),
    model: z.string(),
    messages: z.array(OpenRouterMessageSchema).min(1),
    stream: z.boolean(),
    temperature: z.number(),
});

export const OllamaBodySchema = z.object({
    model: z.string(),
    prompt: z.string(),
    stream: z.boolean(),
    options: z.object({
        temperature: z.number(),
        num_predict: z.number(),
    }),
});
