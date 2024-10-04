import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";
import ListLocation from "./_components/ListLocation";

export const metadata = setTitlePage("Ventes");
const ClientPage = () => {
    return (
        <PageTemplate title="Location - Ventes" description="Gestion des locations et ventes">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    <AddButton />
                </div>
            </section>
            <section>
                <ListLocation />
            </section>
        </PageTemplate>
    );
};

export default ClientPage;
