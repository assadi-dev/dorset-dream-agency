import { datetime } from "drizzle-orm/mysql-core";
import { OrderType } from "../types";
import { Session } from "next-auth";

export const ROLE_ENTITY_ARRAY = ["user", "patron", "admin", "manager"] as const;

/**
 * Ajout des champs created_at et updated_at
 */
export const updatedAndCreatedAt = {
    createdAt: datetime("created_at").$default(() => new Date()), // Timestamp de création
    updatedAt: datetime("updated_at").$onUpdate(() => new Date()),
};

/**
 * Ajout des champs deleted_at
 */
export const deletedAt = {
    deletedAt: datetime("deleted_at"),
};

export const takeUniqueOrThrow = (message: string) => {
    return <T>(values: T[]): T => {
        if (values.length !== 1) throw new Error(`Found non unique or inexistent value: ${message}`);
        return values[0]!;
    };
};

export const ExtractFilterParams = (searchParams: URLSearchParams) => {
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const order = searchParams.get("order")?.toLowerCase() || "desc";
    const search = searchParams.get("search")?.toLowerCase() || null;
    return { search, page, limit, order: order as OrderType };
};

export const generateDescriptionForUserAction = async ({
    session,
    message,
    extras,
}: {
    session: Session | null;
    message: string;
    extras: Record<string, any> | null;
}) => {
    if (session) {
        const description = {
            user: session?.user?.name,
            grade: session?.user?.grade,
            role: session?.user?.role,
            description: message,
            extras: extras || null,
        };

        return description;
    }
    return {
        user: "unknown",
        grade: "unknown",
        role: "unknown",
        description: message,
        extras: extras || null,
    };
};

export const ACTION_NAMES = {
    announcements: {
        create: "Création d'une annonce",
        update: "Modification d'une annonce",
        delete: "Suppression d'une annonce",
        publish: "Publication d'une annonce",
        restore: "Restauration d'une annonce",
        clean: "Suppression de tous les annonces",
    },
    users: {
        create: "Création de compte",
        update: "Modification de compte",
        delete: "Suppression de compte",
        restore: "Restauration de compte",
        updatePassword: "Changement de mot passe",
    },
    employees: {
        create: "Ajout d'un employé",
        update: "Modification d'un employé",
        delete: "Suppression d'un employé",
        restore: "Restauration d'un employé",
        updatePhoto: "Mise à jour de la photo",
        clean: "Suppression de tous les employées",
    },
    clients: {
        create: "Ajout d'un client",
        update: "Modification d'un client",
        delete: "Suppression d'un client",
        dead: "Déclaration de décès",
        restore: "Restauration d'un client",
        clean: "Suppression de tous les clients",
        reset: "Restauration de tout les clients supprimés",
    },
    properties: {
        create: "Ajout d'un bien immobilier",
        update: "Modification d'un bien immobilier",
        delete: "Suppression d'un bien immobilier",
        restore: "Restauration d'un bien immobilier",
        clean: "Suppression de tous les Propriétés",
    },
    variants: {
        create: "Ajout d'une variante",
        update: "Modification d'une variante",
        delete: "Suppression d'une variante",
        restore: "Restauration d'une variante",
        clean: "Suppression de tous les variantes",
    },
    prestige: {
        available: "Mise à jour de la disponibilité d'une propriété",
    },
    transactions: {
        create: "Ajout d'une transaction",
        update: "Modification d'une transaction",
        delete: "Suppression d'une transaction",
        restore: "Restauration d'une transaction",
        clean: "Suppression de tous les transactions",
        status: "Mise à jour du status de la transaction",
    },
};

export const enum ENTITIES_ENUM {
    ANNOUNCEMENTS = "announcements",
    USERS = "users",
    EMPLOYEES = "employees",
    CLIENTS = "clients",
    PROPERTIES = "properties",
    VARIANTS = "variants",
    PRESTIGES = "prestige",
    TRANSACTIONS = "transactions",
}

export const PROPERTY_SERVICE = [
    "Location LS",
    "Ventes LS",
    "Location Favelas",
    "Ventes Favelas",
    "Location Las Venturas",
    "Ventes Las Venturas",
    "Location Blaine County",
    "Ventes Blaine County",
] as const;
export const EMPLOYEE_POST = [
    "Employée",
    "Manageuse",
    "Patron",
    "Employé San Andreas",
    "Employé îles Galapagos",
] as const;

export const LOCATION_STATUS = ["death", "disappearance", "investigation", "ongoing", "cancelled"] as const;

enum SaleFilterEnum {
    VENTES_LS = "Ventes LS",
    VENTES_FAVELAS = "Ventes Favelas",
    Las_Venturas = "Ventes Las Venturas",
    VENTES_BLAINE_COUNTY = "Ventes Blaine County",
}
enum RentalFilterEnum {
    // LOCATION_FAVELAS = "Location Favelas",
    LOCATION_LS = "Location LS",
    LOCATION_LAS_VENTURAS = "Location Las Venturas",
    LOCATION_BLAINE_COUNTY = "Location Blaine County",
}

export const RENTAL_FILTER_ARRAY = Object.entries(RentalFilterEnum).map((item) => item[1]);
export const SALES_FILTER_ARRAY = Object.entries(SaleFilterEnum).map((item) => item[1]);
