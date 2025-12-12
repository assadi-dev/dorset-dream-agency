import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";
import { userRoles } from "../../schema/userRoles";
import { OmitInputCreation } from "@/types/database";

export const userRoleSchema = z.object({
    roleId: z.number().min(1, REQUIRE_MESSAGE_ERROR),
    userId: z.number().min(1, REQUIRE_MESSAGE_ERROR),
    assignedBy: z.number().optional().nullable(),
});

export type UserRoleBase = typeof userRoles.$inferSelect;

export type CreateUserRoleInputs = Omit<UserRoleBase, OmitInputCreation | "assignedAt">;

export type UpdateUserRoleInputs = Partial<CreateUserRoleInputs> & {
    newRoleId: number;
};

export const userRoleObjectSchema = z.object({
    role: z.object({
        id: z.number(),
        name: z.string(),
        displayName: z.string(),
    }),
    user: z.object({
        id: z.number(),
        username: z.string(),
        fullName: z.string(),
    }),
    assigned: z
        .object({
            id: z.number().optional().nullable(),
            username: z.string().optional().nullable(),
            fullName: z.string().optional().nullable(),
            assignedAt: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
});

export type UserUserRoleObjectInfer = z.infer<typeof userRoleObjectSchema>;

export type UserRoleSelectRequest = {
    roleId: number;
    roleName: string;
    roleDisplayName: string;
    userId: number;
    username: string;
    userFullName: string;
    assignedById?: number;
    assignedByUsername?: string;
    assignedByFullName?: string;
    assignedAt: string;
};

export const userRoleParsed = (inputs: UserRoleSelectRequest) => {
    const role = {
        id: inputs.roleId,
        name: inputs.roleName,
        displayName: inputs.roleDisplayName,
    } satisfies UserUserRoleObjectInfer["role"];
    const user = {
        id: inputs.userId,
        username: inputs.username,
        fullName: inputs.userFullName,
    } satisfies UserUserRoleObjectInfer["user"];
    let assignBy: UserUserRoleObjectInfer["assigned"];
    if (inputs.assignedAt) {
        assignBy = {
            id: inputs.assignedById,
            username: inputs.assignedByUsername,
            fullName: inputs.assignedByFullName,
            assignedAt: inputs.assignedAt,
        } satisfies UserUserRoleObjectInfer["assigned"];
    }

    return { role, user, assignBy };
};
