import { RESSOURCE_ACTIONS, DEFAULT_ROLES, RESOURCES } from "./constants";

export type RessourceActionUnion = (typeof RESSOURCE_ACTIONS)[keyof typeof RESSOURCE_ACTIONS];

export type ResourcesUnion = (typeof RESOURCES)[keyof typeof RESOURCES];

export type RoleName = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];
