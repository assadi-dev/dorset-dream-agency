import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/forms/SearchInput";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ListEmployees from "./_components/ListEmployees";
import LoadingSkeleton from "./_components/LoadingSkeleton";
import PageTemplate from "../_components/PageTemplate";

export const metadata = setTitlePage("Prestige");
const TrombinoscopePage = async () => {
    return (
        <PageTemplate title="Trombinoscope">
            <section className="pt-6">
                <SearchInputDataTable />
            </section>
            <React.Suspense fallback={<LoadingSkeleton />}>
                <ListEmployees />
            </React.Suspense>
        </PageTemplate>
    );
};

export default TrombinoscopePage;
