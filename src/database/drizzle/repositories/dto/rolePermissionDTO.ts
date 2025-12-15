import z from "zod";
import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { OmitInputCreation } from "@/types/database";
import { ResourcesUnion, RessourceActionUnion } from "@/lib/rbac/type";
import { rolePermissions } from "../../schema/rolePermissions";

export const rolePermissionSchema = z.object({
    roleId: z.coerce.number().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    ressource: z.custom<ResourcesUnion>(),
    actionsToAdd: z.array(z.custom<RessourceActionUnion>()),
    actionsToRemove: z.array(z.custom<RessourceActionUnion>()),
    grantedBy: z.number().optional().nullable(),
});

type RolePermissionInfer = typeof rolePermissions.$inferInsert;
export type CreateRolePermissionBaseInputs = Omit<RolePermissionInfer, "grantedAt">;

export type RolePermissionBase = z.infer<typeof rolePermissionSchema>;

export type GrantedRolePermissionBaseInputs = Omit<RolePermissionBase, OmitInputCreation | "grantedAt">;

export type UpdateRoleRolePermissionBaseInputs = Partial<RolePermissionBase>;

export type FindRoleRolePermissionField = Omit<CreateRolePermissionBaseInputs, "grantedBy">;
export type FindOneRolePermissionField = { roleId: number; permissionId: number };
