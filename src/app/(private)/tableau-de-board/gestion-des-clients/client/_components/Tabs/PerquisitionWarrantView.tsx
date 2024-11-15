import { useSearchParams } from "next/navigation";
import React from "react";
import { fetchClientPerquisitionWarrant, fetchClientPerquisitionWarrantArgs } from "./helper";
import { useQuery } from "@tanstack/react-query";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import DataTable from "@/components/Datatable/Datatable";
import { WARRANT_COLUMNS } from "./columns";
import AddButton from "@/components/forms/AddButton";
import DropdownActions from "@/components/Datatable/DropdownActions";
import { CellColumn } from "@/app/types/ReactTable";
import WarrantActions from "./columns/WarrantActions";

const PerquisitionWarrantView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const filter: fetchClientPerquisitionWarrantArgs = { id: "" };
    if (id) filter.id = id as string;

    const { data, isFetching } = useQuery({
        queryKey: ["USER_PERQUISITIONS_WARRANT", id],
        queryFn: async () => fetchClientPerquisitionWarrant(filter),
    });
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <WarrantActions payload={row.original} />
                </DropdownActions>
            );
        },
    };
    const WARRANT_COLUMNS_ID = [...WARRANT_COLUMNS, actions];

    return (
        <div className="grid grid-rows-[auto,1fr] mt-3">
            <section>
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    <div className="self-end w-full flex justify-end">{<AddButton title="Ajouter" />}</div>
                </div>
            </section>
            <section className="min-h-[calc(80vh-220px)]">
                {!isFetching && data ? <DataTable columns={WARRANT_COLUMNS_ID} data={data} /> : null}
            </section>
        </div>
    );
};

export default PerquisitionWarrantView;
