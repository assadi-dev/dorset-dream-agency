import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { RESSOURCE_ACTIONS } from "@/lib/rbac/constants";
import { ResourcesUnion, RessourceActionUnion } from "@/lib/rbac/type";
import z from "zod";

export const actionPermissionSchema = z.object({
    roleId: z.coerce.number().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    ressource: z.custom<ResourcesUnion>(),
    actions: z.array(z.custom<RessourceActionUnion>()),
});

export const permissionGrantedRequestBody = z.object({
    actionPermissions: z.array(actionPermissionSchema),
    assigner: z.number().optional().nullable(),
});

export type PermissionGrantedRequestBodyInfer = z.infer<typeof permissionGrantedRequestBody>;

export const actionPermissionParser = {
    validate: (inputs: unknown) => actionPermissionSchema.safeParse(inputs),
    validateBody: (inputs: unknown) => permissionGrantedRequestBody.safeParse(inputs),
};
