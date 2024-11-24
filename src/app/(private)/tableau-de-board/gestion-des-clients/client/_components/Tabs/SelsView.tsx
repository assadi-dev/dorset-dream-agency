import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import React from "react";
import { LOCATION_COLUMNS } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import { fetchClientLocations, filterClientTransaction } from "./helper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { USER_QUERY_KEY } from "@/app/types/QueryKeys";
import useDataCollections from "@/hooks/useDataCollections";
import SimplePagination from "@/components/Paginations/SimplePagination";

const SelsView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") as string;
    const search = searchParams.get("search") || "";
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const type = "vente";

    const filters = { type, search, page, limit } satisfies filterClientTransaction;

    const { data, isFetching, error } = useQuery({
        queryKey: [USER_QUERY_KEY.USER_LOCATION_VENTES, type, id, filters],
        queryFn: () => fetchClientLocations({ id, filters }),
        placeholderData: keepPreviousData,
    });

    const SELS_DATA = useDataCollections(data);

    return (
        <div className="grid grid-rows-[auto,1fr] mt-3">
            <section>
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    {/*   <AddButton /> */}
                </div>
            </section>
            <section className="min-h-[calc(80vh-220px)]">
                <div className="flex justify-between">
                    <div></div>
                    <SimplePagination limit={limit} totalItems={SELS_DATA.totalItems} />
                </div>
                {!error ? <DataTable columns={LOCATION_COLUMNS} data={SELS_DATA.data} /> : null}
            </section>
        </div>
    );
};

export default SelsView;
