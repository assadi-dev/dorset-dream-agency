export enum UserActionEnum {
    create = "Création",
    update = "Modification",
    delete = "Surpression",
}

export type UserAction = "create" | "update" | "delete";
export type UserActionColumnType = {
    user: string;
    grade: string;
    action: UserAction;
    context: string;
    date: string;
};
