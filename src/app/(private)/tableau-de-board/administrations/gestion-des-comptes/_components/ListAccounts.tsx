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
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import useSelectTableRow from "@/hooks/useSelectTableRow";
import AccountSelectedActions from "./AccountSelectedActions";
import { Card, CardFooter } from "@/components/ui/card";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

type ListAccountsProps = {
    accounts: Array<any>;
    limit: number;
    totalItems: number;
};
const ListAccounts = ({ accounts, limit, totalItems }: ListAccountsProps) => {
    const role = useGetRoleUser();
    const { itemChecked, handleSelectedRow, handleSelectedAllRow, reset } = useSelectTableRow();

    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <AccountAction
                        payload={row.original}
                        canUpdate={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                        canChangePassword={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                        canDelete={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                    />
                </DropdownActions>
            );
        },
    };

    const SelectColumns = CheckBoxColumn({
        onCheckedChange: handleSelectedRow,
        onCheckedAllChange: handleSelectedAllRow,
        selected: itemChecked,
    });
    const accountColumns = ACTIONS_CONTROL_PERMISSION.canAction(role)
        ? [SelectColumns, ...columns, actions]
        : [SelectColumns, ...columns];

    return (
        <Card className="px-2 bg-white">
            <div className="my-5 flex justify-between items-center">
                <div className="min-w-[25vw]">
                    <SearchInputDataTable />
                </div>
                <div>
                    {itemChecked.length > 0 && (
                        <AccountSelectedActions selectedItems={itemChecked} resetSelected={reset} />
                    )}
                </div>
            </div>
            <DataTable columns={accountColumns} data={accounts} />
            <CardFooter>
                <div className="flex items-center justify-between w-full">
                    <div></div>
                    <SimplePagination limit={limit} totalItems={totalItems} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default ListAccounts;
