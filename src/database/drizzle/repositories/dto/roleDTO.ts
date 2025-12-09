import z from "zod";
import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { roles } from "../../schema/roles";
import { OmitInputCreation } from "@/types/database";

export type RoleBase = typeof roles.$inferSelect;

export type CreateRoleInputs = Omit<RoleBase, OmitInputCreation>;

export type UpdateRoleInputs = Partial<RoleBase>;

export const roleSchema = z.object({
    name: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    displayName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().optional().nullable(),
});

export const roleValidations = (inputs: unknown) => roleSchema.safeParse(inputs);
