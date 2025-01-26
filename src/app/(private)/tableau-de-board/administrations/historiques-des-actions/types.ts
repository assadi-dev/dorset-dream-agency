export enum UserActionEnum {
    create = "Création",
    update = "Modification",
    delete = "Surpression",
    restore = "Restoration",
}

export type UserAction = "create" | "update" | "delete" | "restore";
export type UserActionColumnType = {
    user: string;
    grade: string;
    action: UserAction;
    context: string;
    date: string;
};
