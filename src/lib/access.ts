import { isAdmin, canDelete, canUpdate, canAction } from "./utils";

export const ACTIONS_CONTROL_PERMISSION = {
    isAdmin: isAdmin,
    canAction: canAction,
    canDelete: canDelete,
    canUpdate: canUpdate,
};
