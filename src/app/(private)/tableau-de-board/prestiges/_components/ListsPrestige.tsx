"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetch_prestige } from "../helper";
import AlertDestructive from "@/components/notify/AlertDestructive";
import PaginationDataTable from "@/components/Datatable/PaginationDataTable";
import { PROPERTY_QUERY_KEY } from "@/app/types/QueryKeys";
import { useSearchParams } from "next/navigation";

const ListsPrestige = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    const { data, error, isFetching } = useQuery({
        queryKey: [PROPERTY_QUERY_KEY.GET_PRESTIGE_PROPERTIES, page, limit, search],
        queryFn: () => fetch_prestige(),
        refetchOnMount: true,
    });

    const PRESTIGE_DATA = React.useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);

    const totalPagination = data ? data.totalItems : 0;
    return (
        <div>
            <div className="my-3">{error ? <AlertDestructive title="Erreur" description={error.message} /> : null}</div>
            <div className="flex justify-end my-3">
                {" "}
                <PaginationDataTable />
            </div>
            <DataTable columns={columns} data={PRESTIGE_DATA} />
        </div>
    );
};

export default ListsPrestige;
