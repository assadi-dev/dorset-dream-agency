import { ENTITIES_ENUM } from "@/database/drizzle/utils";
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
export const RESOURCES = ENTITIES_ENUM;
export const EMPLOYEE_POST = [
    "Employée",
    "Manageuse",
    "Patron",
    "Employé San Andreas",
    "Employé îles Galapagos",
] as const;

export const DEFAULT_GRADES = [
    {
        name: "Patron",
        description: "Responsable de la société",
    },
    {
        name: "Manager",
        description: "",
    },
    {
        name: "Manageuse",
        description: "",
    },
    {
        name: "Employée",
        description: "",
    },
    {
        name: "Employé San Andreas",
        description: "",
    },
    {
        name: "Employé-iles-galapagos",
        description: "",
    },
];
