import { z } from "zod";
import { OllamaBodySchema } from "../schema";

export type OllamaBody = z.infer<typeof OllamaBodySchema>;

export type OllamaPromptReturn = {
    model: string;
    prompt: string;
    stream: boolean;
    options: {
        temperature: number;
        num_predict: number;
    };
};
