"use client";
import { GradeType, SecteurType } from "@/app/types/employee";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Employee = {
    name: string;
    grade: GradeType;
    secteurs: SecteurType[];
    iban: string;
};

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "name",
        header: "Nom Prénom",
    },
    {
        accessorKey: "grade",
        header: "Grade",
    },
    {
        accessorKey: "secteur",
        header: "Secteurs",
    },
    {
        accessorKey: "iban",
        header: "IBAN",
    },
    {
        accessorKey: "phone",
        header: "Téléphone",
    },
];
