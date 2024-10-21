"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import AccountAction from "./AccountAction";
import { CellColumn } from "@/app/types/ReactTable";

type ListAccountsProps = {
    accounts: Array<any>;
};
const ListAccounts = ({ accounts }: ListAccountsProps) => {
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <AccountAction payload={row.original} />
                </DropdownActions>
            );
        },
    };
    const accountColumns = [...columns, actions];

    return <DataTable columns={accountColumns} data={accounts} />;
};

export default ListAccounts;
