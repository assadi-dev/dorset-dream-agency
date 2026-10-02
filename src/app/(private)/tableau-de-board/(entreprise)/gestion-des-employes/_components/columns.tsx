"use client";
import { GradeType, SecteurType } from "@/app/types/employee";
import { CellColumn } from "@/app/types/ReactTable";
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
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "grade",
        header: "Grade",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "secteur",
        header: "Secteurs",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "iban",
        header: "IBAN",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "phone",
        header: "Téléphone",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,

    },
];
