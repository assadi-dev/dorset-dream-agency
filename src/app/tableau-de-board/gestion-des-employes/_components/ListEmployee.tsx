"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import EmployeesActions from "./EmployeesActions";
import { ActionsColumnType } from "@/app/types";

type ListEmployee = {
    employees: any;
};
const ListEmployee = ({ employees }: ListEmployee) => {
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: ActionsColumnType) {
            return (
                <DropdownActions>
                    <EmployeesActions payload={row.original} />
                </DropdownActions>
            );
        },
    };
    const EmployeesColumn = [...columns, actions];

    return <DataTable columns={EmployeesColumn} data={employees} />;
};

export default ListEmployee;
