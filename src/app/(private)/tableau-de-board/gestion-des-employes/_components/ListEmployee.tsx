"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import EmployeesActions from "./EmployeesActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";

type ListEmployee = {
    employees: any[];
    totalItems: number;
    limit: number;
};
const ListEmployee = ({ employees, totalItems, limit }: ListEmployee) => {
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <EmployeesActions payload={row.original} />
                </DropdownActions>
            );
        },
    };
    const EmployeesColumn = [...columns, actions];
    console.log(totalItems);

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
