import { RessourceActionUnion, ResourcesUnion } from "./type";
/**
 * Generation permission action
 * @param resource
 * @param action
 * @returns {string} resource:action
 */
export const getPermissionName = (resource: ResourcesUnion, action: RessourceActionUnion): string => {
    return `${resource}:${action}`;
};
