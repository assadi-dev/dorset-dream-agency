import { z } from "zod";
import { OllamaBodySchema } from "../schema";

export type OllamaBody = z.infer<typeof OllamaBodySchema>;
