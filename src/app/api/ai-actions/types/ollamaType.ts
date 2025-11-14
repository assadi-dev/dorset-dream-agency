import { z } from "zod";
import { OllamaBodySchema } from "../schema";
import { LLmRole } from "./type";

export type OllamaBody = z.infer<typeof OllamaBodySchema>;

export type OllamaPromptReturn = {
    model: string;
    prompt: string;
    stream: boolean;
    role: LLmRole;
    options: {
        temperature: number;
        num_predict: number;
    };
};
