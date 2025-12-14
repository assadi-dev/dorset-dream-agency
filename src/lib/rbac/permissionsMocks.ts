import { RESSOURCE_ACTIONS, RESOURCES } from "./constants";
import { RessourceActionUnion } from "./type";
import { getPermissionName } from "./utils";

export const resourceLabels: Record<string, string> = {
    [RESOURCES.PROPERTIES]: "Biens immobiliers",
    [RESOURCES.USERS]: "Utilisateurs",
    [RESOURCES.ROLES]: "Rôles",
    [RESOURCES.VARIANTS]: "Variantes",
    [RESOURCES.GRADES]: "Grades",
    [RESOURCES.CLIENTS]: "Clients",
    [RESOURCES.EMPLOYEES]: "Employées",
    [RESOURCES.PERMISSIONS]: "Permissions",
    [RESOURCES.TRANSACTIONS]: "Transactions",
    [RESOURCES.ANNOUNCEMENTS]: "Annonces",
    [RESOURCES.PRESTIGES]: "Prestiges",
};

export const actionLabels: Record<string, string> = {
    [RESSOURCE_ACTIONS.CREATE]: "Créer",
    [RESSOURCE_ACTIONS.READ]: "Consulter",
    [RESSOURCE_ACTIONS.UPDATE]: "Modifier",
    [RESSOURCE_ACTIONS.DELETE]: "Supprimer",
    [RESSOURCE_ACTIONS.ALL]: "Tout permis",
};

// Définition des permissions par défaut
export const generatePermissions = () => {
    const perms: Array<{
        name: string;
        displayName: string;
        description: string;
        resource: string;
        action: string;
    }> = [];
    for (const resource of Object.values(RESOURCES)) {
        for (const action of Object.values(RESSOURCE_ACTIONS)) {
            perms.push({
                name: getPermissionName(resource, action as RessourceActionUnion),
                displayName: `${actionLabels[action]} ${resourceLabels[resource]}`,
                description: `Permet de ${actionLabels[action]?.toLowerCase()} les ${resourceLabels[resource]?.toLowerCase()}`,
                resource,
                action,
            });
        }
    }

    return perms;
};
