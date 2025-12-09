import { ACTIONS, DEFAULT_ROLES, RESOURCES } from "./constants";

export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];

export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];

export type RoleName = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];
