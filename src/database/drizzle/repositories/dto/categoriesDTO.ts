
import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import z from "zod";

export const categoriesSchema = z.object({
    name: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type CategoryInputsType = z.infer<typeof categoriesSchema>;

const idsSchema = z.array(z.number()).min(1, { message: REQUIRE_MESSAGE_ERROR });

const reorderCategorySchema = z.object({
    id: z.coerce.number(),
    oldPosition: z.coerce.number(),
    newPosition: z.coerce.number(),
});

export const categoriesValidator  = {
    create: (data: unknown) => {
        return categoriesSchema.safeParse(data);
    },
    update: (data: unknown) => {
        return categoriesSchema.safeParse(data);
    },
    deleteMany: (data: unknown) => {
        return z.object({
            ids: idsSchema,
        }).safeParse(data);
    },
    toggleVisibility: (data: unknown) => {
        return z.object({
            ids: idsSchema,
            isVisible: z.boolean(),
        }).safeParse(data);
    },
    reorder: (data: unknown) => reorderCategorySchema.safeParse(data),
}