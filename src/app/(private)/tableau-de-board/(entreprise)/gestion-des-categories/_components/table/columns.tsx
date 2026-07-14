"use client";
import { datetimeFormatFr3 } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { VisibilitySwitch } from "./VisibilitySwitch";
import DragHandleRows from "./DragHandleRows";

export type Category = {
    id: string;
    name: string;
    count: number;
    isVisible: boolean;
    createdAt: Date;
    orderPosition: number;


};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => {
            return (
                <p className="text-nowrap">{row.getValue("name")}</p>
            );
        },
    },
    {
        accessorKey: "count",
        header: () => (

            <p className="text-center">Proprieté associées</p>

        ),
        cell: ({ row }) => {
            return (

                <p className="text-center">{row.getValue("count")}</p>


            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: ({ row }) =>

            <p className="text-nowrap">{datetimeFormatFr3(row.getValue("createdAt") as string)}</p>,
    },


];


export const toggleVisibilityColumn: ColumnDef<Category> = {
    accessorKey: "isVisible",
    header: () => (
        <p className="text-center text-nowrap">Afficher/masquer</p>
    ),
    cell: ({ row }) =>
        <div className="flex justify-center">
            <VisibilitySwitch key={row.original.id} category={row.original} />
        </div>
}


export const dragHandleColumn: ColumnDef<Category> = {
    id: "orderPosition",
    cell: ({ row }) =>
        <div className="flex justify-center">
            <DragHandleRows key={row.original.id} category={row.original} />
        </div>
}