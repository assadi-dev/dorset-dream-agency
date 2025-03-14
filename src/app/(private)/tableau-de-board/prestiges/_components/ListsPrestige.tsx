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
import useDataCollections from "@/hooks/useDataCollections";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

const ListsPrestige = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    const filter = { page, limit, search };

    const { data, error, isFetching } = useQuery({
        queryKey: [PROPERTY_QUERY_KEY.GET_PRESTIGE_PROPERTIES, filter],
        queryFn: () => fetch_prestige(filter),
        refetchOnMount: true,
    });

    const PRESTIGE_COLLECTION = useDataCollections(data);

    return (
        <Card className="bg-white px-2">
            {/*   <div className="my-3">{error ? <AlertDestructive title="Erreur" description={error.message} /> : null}</div> */}
            <div className="my-5 flex justify-between items-center">
                <div className="flex items-center gap-2  min-w-[25vw]">
                    <SearchInputDataTable />
                </div>
            </div>

            {!error && <DataTable columns={columns} data={PRESTIGE_COLLECTION.data} isLoading={isFetching} />}
            <Separator className="my-3" />
            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <div></div>

                    <div className="self-end">
                        {!error && <SimplePagination totalItems={PRESTIGE_COLLECTION.totalItems} limit={limit} />}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ListsPrestige;
