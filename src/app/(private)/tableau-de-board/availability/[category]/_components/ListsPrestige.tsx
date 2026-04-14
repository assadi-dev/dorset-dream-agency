"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { PROPERTY_QUERY_KEY } from "@/app/types/QueryKeys";
import { useSearchParams } from "next/navigation";
import useDataCollections from "@/hooks/useDataCollections";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import { fetch_by_category } from "../helper";
import SelecteCategory from "./SelecteCategory";
import { CategoryOption } from "../../type";


type LissteCategoriesProps = {
    categoryID?: number;
    categoriesoptions: CategoryOption[];
}
const ListsPrestige = ({ categoryID, categoriesoptions }: LissteCategoriesProps) => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";
    const category = categoryID;

    const filter = { page, limit, search, category };

    const { data, error, isFetching } = useQuery({
        queryKey: [PROPERTY_QUERY_KEY.GET_PRESTIGE_PROPERTIES, filter],
        queryFn: () => fetch_by_category(filter),
        refetchOnMount: true,
    });

    const PRESTIGE_COLLECTION = useDataCollections(data);

    return (
        <Card className="bg-dynasty-card px-2">
            {/*   <div className="my-3">{error ? <AlertDestructive title="Erreur" description={error.message} /> : null}</div> */}
            <div className="my-5 flex justify-between items-center">
                <div className="flex items-center gap-2  min-w-[25vw]">
                    <SearchInputDataTable />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <SelecteCategory defaultValue={categoryID?.toString() || "all"} categoriesoptions={categoriesoptions} />
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
