import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ListEmployees from "./_components/ListEmployees";
import LoadingSkeleton from "./_components/LoadingSkeleton";
import PageTemplate from "../_components/PageTemplate";
import { getEmployeeCollections } from "@/database/drizzle/repositories/employee";
import { EmployeeBasic } from "@/app/types/employee";
import SimplePagination from "@/components/Paginations/SimplePagination";

export const metadata = setTitlePage("Prestige");
type TrombinoscopePageProps = {
    searchParams: { search: string; limit: string; page: string };
};
const TrombinoscopePage = async ({ searchParams }: TrombinoscopePageProps) => {
    const search = searchParams.search || "";
    const limit = Number(searchParams.limit) || 15;
    const page = Number(searchParams.page) || 1;
    const filter = { search, limit, page };

    const ListEmployeeAsync = async () => {
        const employees = await getEmployeeCollections(filter);
        return (
            employees && (
                <ListEmployees
                    employees={employees.data as EmployeeBasic[]}
                    limit={limit}
                    totalItems={employees.totalItems}
                />
            )
        );
    };

    return (
        <PageTemplate title="Trombinoscope">
            <React.Suspense fallback={<LoadingSkeleton />}>
                <ListEmployeeAsync />
            </React.Suspense>
        </PageTemplate>
    );
};

export default TrombinoscopePage;
