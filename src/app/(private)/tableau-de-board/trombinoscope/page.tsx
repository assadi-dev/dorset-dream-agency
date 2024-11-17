import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ListEmployees from "./_components/ListEmployees";
import LoadingSkeleton from "./_components/LoadingSkeleton";
import PageTemplate from "../_components/PageTemplate";
import { getEmployeeCollections } from "@/database/drizzle/repositories/employee";
import { EmployeeBasic } from "@/app/types/employee";

export const metadata = setTitlePage("Prestige");
const TrombinoscopePage = async () => {
    const employees = await getEmployeeCollections();

    return (
        <PageTemplate title="Trombinoscope">
            <section className="pt-6">
                <SearchInputDataTable />
            </section>
            <React.Suspense fallback={<LoadingSkeleton />}>
                <ListEmployees employees={employees as EmployeeBasic[]} />
            </React.Suspense>
        </PageTemplate>
    );
};

export default TrombinoscopePage;
