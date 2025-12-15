import { rolePermissionSchema } from "@/database/drizzle/repositories/dto/rolePermissionDTO";
import z from "zod";

export const permissionGrantedRequestBody = z.object({
    actionPermissions: z.array(rolePermissionSchema),
    assigner: z.number().optional().nullable(),
});

export type PermissionGrantedRequestBodyInfer = z.infer<typeof permissionGrantedRequestBody>;

export const actionPermissionParser = {
    validate: (inputs: unknown) => rolePermissionSchema.safeParse(inputs),
    validateBody: (inputs: unknown) => permissionGrantedRequestBody.safeParse(inputs),
};
