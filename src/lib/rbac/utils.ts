import { Action, Resource } from "./type";
/**
 * Generation permission action
 * @param resource
 * @param action
 * @returns {string} ressource:action
 */
export const getPermissionName = (resource: Resource, action: Action): string => {
    return `${resource}:${action}`;
};
