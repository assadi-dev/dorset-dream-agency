"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";
import { CellColumn } from "@/app/types/ReactTable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import ActionUserDropdown from "./ActionUserDropdown";
import RightFilterActions from "./RightFilterActions";
import { useQuery } from "@tanstack/react-query";
import { fetchUserActionCollection, INIT_DATE, QUERY_USERS_ACTIONS } from "../utils";
import { useSearchParams } from "next/navigation";
import { datetimeFormatWithoutSecISO8601 } from "@/lib/date";
import { Card, CardFooter } from "@/components/ui/card";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { Separator } from "@/components/ui/separator";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

const ListActionsHistory = () => {
    const dt = new Date();
    const role = useGetRoleUser();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";
    const actions = searchParams.get("action") || encodeURI("create,update,delete,restore");
    const from = searchParams.get("from") || datetimeFormatWithoutSecISO8601(INIT_DATE.from.toISOString());
    const to = searchParams.get("to") || datetimeFormatWithoutSecISO8601(INIT_DATE.to.toISOString());

    const { data, isFetching, error } = useQuery({
        queryKey: [QUERY_USERS_ACTIONS.GET_USERS_ACTION_COLLECTIONS, page, limit, search, actions, from, to],
        queryFn: () => fetchUserActionCollection({ page, limit, search, actions, from, to }),
        refetchOnMount: true,
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
                <div></div>
            </div>
            <Card className="px-2 bg-white">
                <div className="my-5 flex justify-between items-center">
                    <div className="min-w-[25vw]">
                        <SearchInputDataTable />
                    </div>
                    <RightFilterActions totalItem={data?.totalItems || 0} />
                </div>
                <DataTable columns={UserActionColumns} data={collections} isLoading={isFetching} />
                <Separator className="my-3" />
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                        <div></div>
                        <SimplePagination totalItems={data?.totalItems || 0} limit={limit} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ListActionsHistory;
