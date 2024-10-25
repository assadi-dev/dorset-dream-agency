import React from "react";
import PageTemplate from "../_components/PageTemplate";
import ListsPrestige from "./_components/ListsPrestige";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

const PrestigePage = () => {
    return (
        <PageTemplate title="Prestiges">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                </div>
            </section>
            <ListsPrestige />
        </PageTemplate>
    );
};

export default PrestigePage;
