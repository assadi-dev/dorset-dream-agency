import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import z from "zod";

export const actionPermissionSchema = z.object({
    role: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    ressource: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    actions: z.array(z.string()).min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export const permissionRequestBody = z.object({
    actionPermissions: z.array(actionPermissionSchema),
    assigner: z.number().optional().nullable(),
});

export type PermissionRequestBodyInfer = z.infer<typeof permissionRequestBody>;

export const actionPermissionParser = {
    validate: (inputs: unknown) => actionPermissionSchema.safeParse(inputs),
    validateBody: (inputs: unknown) => permissionRequestBody.safeParse(inputs),
};
