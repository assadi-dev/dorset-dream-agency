"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import UserActionsPage from "./UserActionsPage";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import SimpleTable from "@/components/Datatable/BasicTable";
import { Card, CardContent } from "@/components/ui/card";
import { UserActionColumnType } from "../types";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";
import { CellColumn } from "@/app/types/ReactTable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import ActionUserDropdown from "./ActionUserDropdown";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import RightFilterActions from "./RightFilterActions";

const ListActionsHistory = () => {
    const role = useGetRoleUser();
    const data: UserActionColumnType[] = [
        { user: "Alice", grade: "employé", action: "update", context: "Modifié email", date: "2025-01-25" },
        { user: "Bob", grade: "employé", action: "delete", context: "Supprimé compte", date: "2025-01-22" },
        { user: "Bob", grade: "employé", action: "create", context: "Ajout d'une propriété", date: "2025-01-22" },
    ];

    const actions = {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: CellColumn) => (
            <DropdownActions>
                <ActionUserDropdown userActionItem={row.original} />
            </DropdownActions>
        ),
    };
    const UserActionColumns = ACTIONS_CONTROL_PERMISSION.isAdmin(role) ? [...columns, actions] : columns;

    return (
        <div>
            <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] py-6 items-center gap-3">
                <SearchInputDataTable />
                <RightFilterActions totalItem={500} />
            </div>
            <DataTable columns={UserActionColumns} data={data} />
        </div>
    );
};

export default ListActionsHistory;
