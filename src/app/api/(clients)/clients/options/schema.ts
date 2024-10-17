import { z } from "zod";

export const clientOptionSchema = z.object({
    id: z.number(),
    label: z.string(),
    value: z.coerce.string(),
});
