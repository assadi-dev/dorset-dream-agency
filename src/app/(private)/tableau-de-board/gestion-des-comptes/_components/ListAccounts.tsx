"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import AccountAction from "./AccountAction";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";

type ListAccountsProps = {
    accounts: Array<any>;
    limit: number;
    totalItems: number;
};
const ListAccounts = ({ accounts, limit, totalItems }: ListAccountsProps) => {
    const role = useGetRoleUser();
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
    const accountColumns = ACTIONS_CONTROL_PERMISSION.isAdmin(role) ? [...columns, actions] : columns;

    return (
        <>
            <div className="flex justify-between">
                <div></div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>

            <DataTable columns={accountColumns} data={accounts} />
        </>
    );
};

export default ListAccounts;
