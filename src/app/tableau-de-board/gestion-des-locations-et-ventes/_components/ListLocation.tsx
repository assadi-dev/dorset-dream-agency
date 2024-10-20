"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import TransactionActions from "./TransactionActions";

type ListLocationProps = {
    transactions: any;
};
const ListLocation = ({ transactions }: ListLocationProps) => {
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }) {
            return (
                <DropdownActions>
                    <TransactionActions payload={row.original} />
                </DropdownActions>
            );
        },
    };
    const transactionssColumn = [...columns, actions];

    return <DataTable columns={transactionssColumn} data={transactions} />;
};

export default ListLocation;
