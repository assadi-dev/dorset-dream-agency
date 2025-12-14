import { RESOURCES, RESSOURCE_ACTIONS } from "@/lib/rbac/constants";

export const ROLE_MOCK_DATA = [
    { name: "moderator", displayName: "Modérateur", level: 99 },
    { name: "helper", displayName: "Support technique", level: 98 },
];

export const GRANTED_ACTION_PERMISSIONS_MOCK = {
    clients: {
        all: {
            roleId: 1,
            actions: [RESSOURCE_ACTIONS.ALL],
            ressource: RESOURCES.CLIENTS,
        },
        create: {
            roleId: 1,
            actions: [RESSOURCE_ACTIONS.CREATE],
            ressource: RESOURCES.CLIENTS,
        },
        update: {
            roleId: 1,
            actions: [RESSOURCE_ACTIONS.UPDATE],
            ressource: RESOURCES.CLIENTS,
        },
        delete: {
            roleId: 1,
            actions: [RESSOURCE_ACTIONS.DELETE],
            ressource: RESOURCES.CLIENTS,
        },
        createAndUpdate: {
            roleId: 2,
            actions: [RESSOURCE_ACTIONS.CREATE, RESSOURCE_ACTIONS.UPDATE],
            ressource: RESOURCES.CLIENTS,
        },
    },
};
