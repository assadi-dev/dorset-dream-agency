import { GenderType } from ".";

export type GradeType = "Patron" | "Manageuse" | "Employé San Andreas" | "Employé îles Galapagos";

export type SecteurType = "San Andreas" | "Iles Galapagos";

export type EmployeeBasic = {
    id: number;
    name: string;
    phone: string;
    gender: GenderType;
    secteur: SecteurType;
    grade: GradeType;
    photoUrl?: string | null;
};
