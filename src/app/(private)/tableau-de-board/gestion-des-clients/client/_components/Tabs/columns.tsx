"use client";
import { GradeType, SecteurType } from "@/app/types/employee";
import { ColumnDef } from "@tanstack/react-table";
import { CellColumn } from "@/app/types/ReactTable";
import { datetimeFormatFr, datetimeFormatFr2 } from "@/lib/date";

export type LocationType = {
    property: string;
    seller: GradeType;
    propertyService: string;
    category: string;
    price: string;
    transactionDate: string;
};

export const LOCATION_COLUMNS: ColumnDef<LocationType>[] = [
    {
        accessorKey: "property",
        header: "Biens",
    },
    {
        accessorKey: "seller",
        header: "Vendeur",
    },
    {
        accessorKey: "propertyService",
        header: "Service",
    },
    {
        accessorKey: "category",
        header: "Catégorie",
    },
    {
        accessorKey: "price",
        header: "Prix",
    },
    {
        accessorKey: "transactionDate",
        header: "Date et heure",
        cell: ({ getValue }: CellColumn) => datetimeFormatFr(getValue()),
    },
];

type WarrantType = {
    id: number;
    agent: string;
    category: string;
};
export const WARRANT_COLUMNS: ColumnDef<WarrantType>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "agent",
        header: "Agent",
    },

    {
        accessorKey: "createdAt",
        header: "Date et heure",
        cell: ({ getValue }: CellColumn) => datetimeFormatFr(getValue()),
    },
];
