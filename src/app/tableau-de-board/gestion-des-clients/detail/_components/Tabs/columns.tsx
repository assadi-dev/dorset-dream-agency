"use client";
import { GradeType, SecteurType } from "@/app/types/employee";
import { ColumnDef } from "@tanstack/react-table";

export type LocationType = {
    name: string;
    grade: GradeType;
    secteurs: SecteurType[];
    iban: string;
};

export const LOCATION_COLUMNS: ColumnDef<LocationType>[] = [
    {
        accessorKey: "appartement",
        header: "Biens",
    },
    {
        accessorKey: "Type",
        header: "type",
    },
    {
        accessorKey: "¨Prix",
        header: "sellingPrice",
    },
    {
        accessorKey: "Date et heure",
        header: "createdAt",
    },
];
