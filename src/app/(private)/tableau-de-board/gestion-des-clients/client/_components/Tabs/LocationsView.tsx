import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { LOCATION_COLUMNS } from "./columns";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchClientLocations, fetchClientLocationsArgs, filterClientTransaction } from "./helper";
import { useSearchParams } from "next/navigation";
import { USER_QUERY_KEY } from "@/app/types/QueryKeys";
import useDataCollections from "@/hooks/useDataCollections";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LocationsView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") as string;
    const search = searchParams.get("search") || "";
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const type = "location";
    const filters = { type, search, page, limit } satisfies filterClientTransaction;

    const { data, isFetching, error } = useQuery({
        queryKey: [USER_QUERY_KEY.USER_LOCATION_VENTES, type, id, filters],
        queryFn: () => fetchClientLocations({ id, filters }),
        placeholderData: keepPreviousData,
    });

    const LOCATION_DATA = useDataCollections(data);

    return (
        <Card className="px-2 mt-3">
            <section className="my-5 flex items-center justify-between">
                <div className="flex items-center gap-2  min-w-[25vw]">
                    <SearchInputDataTable />
                </div>
                <div></div>
            </section>
            <section className="h-[calc(80vh-270px)] overflow-hidden">
                {!error ? <DataTable columns={LOCATION_COLUMNS} data={LOCATION_DATA.data} /> : null}
            </section>
            <Separator className="my-3" />
            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <div></div>
                    <SimplePagination limit={limit} totalItems={LOCATION_DATA.totalItems} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default LocationsView;
