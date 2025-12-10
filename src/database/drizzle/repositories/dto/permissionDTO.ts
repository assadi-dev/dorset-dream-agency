import { OmitInputCreation } from "@/types/database";
import z from "zod";
import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { permissions } from "../../schema/permissions";

export type CreatePermissionBase = typeof permissions.$inferSelect;

export type CreatePermissionInputs = Omit<CreatePermissionBase, OmitInputCreation>;

export type UpdatePermissionInputs = Partial<CreatePermissionBase>;

export const permissionSchema = z.object({
    name: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    displayName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().optional().nullable(),
    ressource: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    action: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export const validatePermissionInput = async (inputs: unknown) => permissionSchema.safeParse(inputs);
