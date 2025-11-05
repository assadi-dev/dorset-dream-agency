import { z } from "zod";

export const requestBodySchema = z.object({
    actions: z.enum(["resume", "describe", "rephrase", "correct"]),
    text: z.string().min(1).max(255),
});

export const OpenRouterBodySchema = z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
    name: z.string().optional().nullable(),
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
