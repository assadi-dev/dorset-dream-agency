import { OmitInputCreation } from "@/types/database";
import { grades } from "../../schema/grades";
import z from "zod";
import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";

export type CreateGradeBase = typeof grades.$inferSelect;

export type CreateGradeInputs = Omit<CreateGradeBase, OmitInputCreation>;

export type UpdateGradeInputs = Partial<CreateGradeBase>;

export const gradeSchema = z.object({
    name: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().optional().nullable(),
});

export const gradeValidations = (inputs: unknown) => gradeSchema.safeParse(inputs);
