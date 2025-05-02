import { useSearchParams } from "next/navigation";
import React from "react";
import { fetchClientPerquisitionWarrant, fetchClientPerquisitionWarrantArgs } from "./helper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import DataTable from "@/components/Datatable/Datatable";
import { WARRANT_COLUMNS } from "./columns";
import AddButton from "@/components/forms/AddButton";
import DropdownActions from "@/components/Datatable/DropdownActions";
import { CellColumn } from "@/app/types/ReactTable";
import WarrantActions from "./columns/WarrantActions";
import useModalState from "@/hooks/useModalState";
import AddWarrant from "./views/AddWarrant";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { USER_QUERY_KEY } from "@/app/types/QueryKeys";
import useDataCollections from "@/hooks/useDataCollections";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PerquisitionWarrantView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") as string;
    const search = searchParams.get("search") || "";
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const type = "prestige";

    const filters = { type, search, page, limit };

    const { data, isFetching, error } = useQuery({
        queryKey: [USER_QUERY_KEY.USER_PERQUISITIONS_WARRANT, id, filters],
        queryFn: async () => fetchClientPerquisitionWarrant({ id, filters }),
        placeholderData: keepPreviousData,
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

    const { openModal } = useModalState();

    const handleClickAddWarrant = () => {
        openModal({
            title: "Ajouter vos mandats",
            component: AddWarrant,
        });
    };

    const WARRANT_DATA = useDataCollections(data);

    return (
        <Card className="px-2 mt-3">
            <section className="my-5 flex items-center justify-between">
                <div className="flex items-center gap-2  min-w-[25vw]">
                    <SearchInputDataTable />
                </div>
                <div className="self-end w-full flex justify-end">
                    {<AddButton title="Ajouter" onClick={handleClickAddWarrant} />}
                </div>
            </section>
            <section className="min-h-[calc(80vh-270px)]">
                {!error ? <DataTable columns={WARRANT_COLUMNS_ID} data={WARRANT_DATA.data} /> : null}
            </section>
            <Separator className="my-3" />
            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <div></div>
                    <SimplePagination limit={limit} totalItems={WARRANT_DATA.totalItems} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default PerquisitionWarrantView;
