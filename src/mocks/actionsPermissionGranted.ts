import { RESOURCES, RESSOURCE_ACTIONS } from "@/lib/rbac/constants";

export const ROLE_MOCK_DATA = [
    { name: "moderator", displayName: "Modérateur", level: 99 },
    { name: "helper", displayName: "Support technique", level: 98 },
];

export const PERMISSIONS_MOCK = [
    {
        id: 1,
        name: "clients:all",
        displayName: "Clients",
        ressource: "clients",
        action: "all",
    },
    {
        id: 2,
        name: "clients:read",
        displayName: "Clients",
        ressource: "clients",
        action: "read",
    },
    {
        id: 3,
        name: "clients:create",
        displayName: "Clients",
        ressource: "clients",
        action: "create",
    },
    {
        id: 4,
        name: "clients:update",
        displayName: "Clients",
        ressource: "clients",
        action: "update",
    },
    {
        id: 5,
        name: "clients:delete",
        displayName: "Clients",
        ressource: "clients",
        action: "delete",
    },
    {
        id: 6,
        name: "employees:all",
        displayName: "Créer Employées",
        ressource: "employees",
        action: "all",
    },
];

export const GRANTED_ACTION_PERMISSIONS_MOCK = {
    clients: {
        all: {
            roleId: 1,
            ressource: RESOURCES.CLIENTS,
            actionsToAdd: [PERMISSIONS_MOCK[0].action],
            actionsToRemove: [],
        },
        create: {
            roleId: 1,
            ressource: RESOURCES.CLIENTS,
            actionsToAdd: [PERMISSIONS_MOCK[2].action],
            actionsToRemove: [],
        },
        update: {
            roleId: 1,
            ressource: RESOURCES.CLIENTS,
            actionsToAdd: [PERMISSIONS_MOCK[3].action],
            actionsToRemove: [],
        },
        delete: {
            roleId: 1,
            ressource: RESOURCES.CLIENTS,
            actionsToAdd: [PERMISSIONS_MOCK[4].action],
            actionsToRemove: [],
        },
        createAndUpdate: {
            roleId: 2,
            ressource: RESOURCES.CLIENTS,
            actionsToAdd: [PERMISSIONS_MOCK[2].action, PERMISSIONS_MOCK[3].action],
            actionsToRemove: [],
        },
        removeCreate: {
            roleId: 2,
            ressource: RESOURCES.CLIENTS,
            actionsToAdd: [],
            actionsToRemove: [PERMISSIONS_MOCK[4].action],
        },
    },
};
