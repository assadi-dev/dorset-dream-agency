import { getPermissionName } from "./utils";

// Constantes des rôles par défaut
export const DEFAULT_ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    MANAGER: "manager",
    AGENT: "agent",
    VIEWER: "viewer",
} as const;

// Définition des rôles par défaut
export const defaultRoles = [
    {
        name: DEFAULT_ROLES.SUPER_ADMIN,
        displayName: "Super Administrateur",
        description: "Accès complet à toutes les fonctionnalités",
    },
    {
        name: DEFAULT_ROLES.ADMIN,
        displayName: "Administrateur",
        description: "Gestion complète sauf paramètres système",
    },
    {
        name: DEFAULT_ROLES.MANAGER,
        displayName: "Gestionnaire",
        description: "Gestion des biens, locataires et contrats",
    },
    {
        name: DEFAULT_ROLES.AGENT,
        displayName: "Agent",
        description: "Accès limité aux biens assignés",
    },
    {
        name: DEFAULT_ROLES.VIEWER,
        displayName: "Lecteur",
        description: "Consultation uniquement",
    },
];

// Actions CRUD
export const ACTIONS = {
    CREATE: "create",
    READ: "read",
    UPDATE: "update",
    DELETE: "delete",
    ALL: "all",
} as const;

// Ressources ou entité de l'application
export const RESOURCES = {
    PROPERTIES: "properties",
    VARIANTS: "variants",
    EMPLOYEES: "employees",
    CLIENTS: "clients",
    USERS: "users",
    GRADES: "grades",
    TRANSACTIONS: "transactions",
    ROLES: "roles",
    PERMISSIONS: "permissions",
} as const;
