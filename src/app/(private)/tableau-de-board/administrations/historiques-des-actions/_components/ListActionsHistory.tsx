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
import { useQuery } from "@tanstack/react-query";
import { fetchUserActionCollection, QUERY_USERS_ACTIONS } from "../utils";
import { useSearchParams } from "next/navigation";

const ListActionsHistory = () => {
    const role = useGetRoleUser();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";
    const actions = searchParams.get("action") || "update,delete";

    const { data, isFetching, error } = useQuery({
        queryKey: [QUERY_USERS_ACTIONS.GET_USERS_ACTION_COLLECTIONS, page, limit, search, actions],
        queryFn: () => fetchUserActionCollection({ page, limit, search, actions }),
    });

    const collections = React.useMemo(() => {
        if (data) {
            return data.data;
        }
        return [];
    }, [data]);

    const actionColumn = {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: CellColumn) => (
            <DropdownActions>
                <ActionUserDropdown userActionItem={row.original} />
            </DropdownActions>
        ),
    };
    const UserActionColumns = ACTIONS_CONTROL_PERMISSION.isAdmin(role) ? [...columns, actionColumn] : columns;

    return (
        <div>
            <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] py-6 items-center gap-3">
                <SearchInputDataTable />
                <RightFilterActions totalItem={data?.totalItems || 0} />
            </div>
            <DataTable columns={UserActionColumns} data={collections} isLoading={isFetching} />
        </div>
    );
};

export default ListActionsHistory;
