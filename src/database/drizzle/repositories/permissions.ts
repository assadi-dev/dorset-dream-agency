import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { generateDescription } from "./utils/entity";

export const createPermission = async (inputs) => {
    if (permission) {
        const descriptionMessage = `Ajout permission ${permission.name}`;
        registerPermissionAction("create", descriptionMessage, ACTION_NAMES.permissions.create);
    }
};
export const findPermissionById = async (id: number) => {};
export const updatePermission = async (id: number, inputs) => {};
export const deletePermission = async (id: number) => {
    const permission = await findPermissionById(id);
    if (!permission) throw Error("permission no found");

    if (permission) {
        const descriptionMessage = `Suppression de la permission ${permission.name}`;
        registerPermissionAction("delete", descriptionMessage, ACTION_NAMES.permissions.delete);
    }
};
export const deleteMultiplePermission = async (ids: number[]) => {
    for (const id of ids) {
        try {
            await deletePermission(id);
        } catch (error) {
            continue;
        }
    }
};

const registerPermissionAction = async (
    action: "create" | "update" | "delete" | "restore",
    message: string,
    name: string,
) => {
    const descriptionMessage = message;
    const description = await generateDescription(descriptionMessage);
    if (description) {
        insertUserAction({
            user: description.user as string,
            action: action,
            name: name,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: ENTITIES_ENUM.PERMISSIONS,
        });
    }
};
