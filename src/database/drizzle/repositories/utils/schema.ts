import { OrderType } from "@/database/types";
import { z } from "zod";

const PaginationParamsSchema = z.object({
    search: z.string().optional(),
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().optional(),
    order: z
        .string()
        .optional()
        .transform((value?: string) => value?.toLowerCase() as OrderType),
});

export type PaginationParamsType = z.infer<typeof PaginationParamsSchema>;
