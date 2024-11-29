export type Role = "user" | "admin";
export enum RoleEnum {
    user = "user",
    admin = "admin",
}

export type ActionPermission = {
    canUpdate?: boolean;
    canDelete?: boolean;
};
