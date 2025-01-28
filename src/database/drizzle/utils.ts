import { datetime } from "drizzle-orm/mysql-core";
import { OrderType } from "../types";
import { Session } from "next-auth";

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
    };
};

export const ACTION_NAMES = {
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
    },
    clients: {
        create: "Ajout d'un client",
        update: "Modification d'un client",
        delete: "Suppression d'un client",
        restore: "Restauration d'un client",
    },
    properties: {
        create: "Ajout d'un bien immobilier",
        update: "Modification d'un bien immobilier",
        delete: "Suppression d'un bien immobilier",
        restore: "Restauration d'un bien immobilier",
    },
    variants: {
        create: "Ajout d'une variante",
        update: "Modification d'une variante",
        delete: "Suppression d'une variante",
        restore: "Restauration d'une variante",
    },
    prestige: {
        available: "Mise à jour de la disponibilité",
    },
};

export const enum ENTITIES_ENUM {
    USERS = "users",
    EMPLOYEES = "employees",
    CLIENTS = "clients",
    PROPERTIES = "properties",
    VARIANTS = "variants",
    PRESTIGES = "prestige",
}
