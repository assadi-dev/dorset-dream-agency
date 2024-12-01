"use client";

import { ColumnDef } from "@tanstack/react-table";
import { datetimeFormatFr } from "@/lib/date";
import { CellColumn } from "@/app/types/ReactTable";
import { LocationColumnType } from "../../../gestion-des-locations-et-ventes/types";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "employee",
        header: "Employé(e)",
    },

    {
        accessorKey: "sales",
        header: "Entrés",
    },
    {
        accessorKey: "rental",
        header: "Location",
    },
    {
        accessorKey: "sales",
        header: "Ventes",
    },
];
