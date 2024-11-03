import { useSearchParams } from "next/navigation";
import React from "react";
import { fetchClientLocations, fetchClientLocationsArgs } from "./helper";
import { useQuery } from "@tanstack/react-query";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import DataTable from "@/components/Datatable/Datatable";
import { LOCATION_COLUMNS } from "./columns";

const PrestigeView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const filter = { id: "", type: "prestige" } satisfies fetchClientLocationsArgs;
    if (id) filter.id = id as string;

    const { data, isFetching } = useQuery({
        queryKey: ["USER_LOCATION_VENTES"],
        queryFn: async () => fetchClientLocations(filter),
    });

    return (
        <div className="grid grid-rows-[auto,1fr] mt-3">
            <section>
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    {/*   <AddButton /> */}
                </div>
            </section>
            <section className="min-h-[calc(80vh-220px)]">
                {!isFetching && data ? <DataTable columns={LOCATION_COLUMNS} data={data} /> : null}
            </section>
        </div>
    );
};

export default PrestigeView;