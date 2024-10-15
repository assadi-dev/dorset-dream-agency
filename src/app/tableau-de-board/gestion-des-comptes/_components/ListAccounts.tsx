"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import AccountAction from "./AccountAction";

const ListAccounts = ({ accounts }) => {
    const handleEditAction = () => {};
    const handleDeleeteAction = () => {};

    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }) {
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
