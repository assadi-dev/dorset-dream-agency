import { z } from "zod";

export const searchFilterSchema = z.object({
    search: z.string().optional().nullable(),
    category: z.string().min(1, { message: "Veuillez sélectionner une catégorie !" }),
    availability: z.string().optional().nullable(),
});

export type SearchFilterInfer = z.infer<typeof searchFilterSchema>;
