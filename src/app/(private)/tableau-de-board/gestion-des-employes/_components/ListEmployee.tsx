"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import EmployeesActions from "./EmployeesActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";

type ListEmployeeProps = {
    employees: any[];
    totalItems: number;
    limit: number;
};
const ListEmployee = ({ employees, totalItems, limit }: ListEmployeeProps) => {
    const role = useGetRoleUser();
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <EmployeesActions
                        payload={row.original}
                        canDelete={false}
                        canUpdate={true}
                        canUpload={ACTIONS_CONTROL_PERMISSION.isAdmin(role)}
                    />
                </DropdownActions>
            );
        },
    };

    const EmployeesColumn = ACTIONS_CONTROL_PERMISSION.isAdmin(role) ? [...columns, actions] : columns;

    return (
        <>
            <div className="my-5 flex justify-between items-center">
                <div></div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <DataTable columns={EmployeesColumn} data={employees} />
        </>
    );
};

export default ListEmployee;
