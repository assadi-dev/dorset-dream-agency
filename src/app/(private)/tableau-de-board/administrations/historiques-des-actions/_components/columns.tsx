"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserAction, UserActionColumnType } from "../types";
import ActionTypeColumnView from "./ActionTypeView";

export const columns: ColumnDef<UserActionColumnType>[] = [
    {
        accessorKey: "user",
        header: "Utilisateur",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ cell }) => <ActionTypeColumnView action={cell.getValue() as UserAction} />,
    },
    {
        accessorKey: "context",
        header: "Context",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ cell }) => cell.getValue(),
    },
];
