export type ActionControl = {
    canCreate?: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canChangePassword?: boolean;
};

export enum UserActionEnum {
    create = "Création",
    update = "Modification",
    delete = "Surpression",
    restore = "Restoration",
}

export type UserActionUnion = "create" | "update" | "delete" | "restore";
