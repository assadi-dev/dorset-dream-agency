"use client";
import { GradeType, SecteurType } from "@/app/types/employee";
import { ColumnDef } from "@tanstack/react-table";
import { CellColumn } from "@/app/types/ReactTable";
import { datetimeFormatFr, datetimeFormatFr2 } from "@/lib/date";
import StatusLocationVente from "@/app/(private)/tableau-de-board/gestion-des-locations-et-ventes/_components/StatusLocationVente";

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
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "seller",
        header: "Vendeur",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "propertyService",
        header: "Service",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "category",
        header: "Catégorie",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "keyNumber",
        header: "N° de clé",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "price",
        header: "Prix",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{getValue()}</div>,
    },
    {
        accessorKey: "invoice",
        header: "N° Facture",
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Statut</div>,
        cell: ({ row }: CellColumn) => <StatusLocationVente item={row.original as any} />,
    },
    {
        accessorKey: "transactionDate",
        header: "Date et heure",
        cell: ({ getValue }: CellColumn) => <div className="text-nowrap">{datetimeFormatFr(getValue())}</div>,
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
        accessorKey: "employee",
        header: "Agent",
    },

    {
        accessorKey: "createdAt",
        header: "Date et heure",
        cell: ({ getValue }: CellColumn) => datetimeFormatFr(getValue()),
    },
];
