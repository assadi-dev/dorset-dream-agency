import { ERROR_AUTH_MESSAGE } from "./messages";

export const ROLE_OPTIONS: Record<"label" | "value", string>[] = [
    {
        label: "Utilisateur",
        value: "user",
    },
    {
        label: "Patron",
        value: "patron",
    },
    {
        label: "Admin",
        value: "admin",
    },
];

export const GRADE_OPTIONS: Record<"label" | "value", string>[] = [
    {
        label: "Employée",
        value: "Employée",
    },
    {
        label: "Employé San Andreas",
        value: "Employé San Andrea",
    },
    {
        label: "Employé îles Galapagos",
        value: "Employé îles Galapagos",
    },
    {
        label: "Manageuse",
        value: "Manageuse",
    },
    {
        label: "Patron",
        value: "Patron",
    },
];
export const GENRE_OPTIONS: Record<"label" | "value", string>[] = [
    {
        label: "Homme",
        value: "Male",
    },
    {
        label: "Femme",
        value: "Female",
    },
];

export const PURCHASE_TYPE = [
    {
        label: "Location",
        value: "Location",
    },
    {
        label: "Vente",
        value: "Vente",
    },
];

export type ErrorAuthMessageKey = keyof typeof ERROR_AUTH_MESSAGE;
