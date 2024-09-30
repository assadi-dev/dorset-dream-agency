import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";

export const metadata = setTitlePage("Ventes");
const ClientPage = () => {
    return (
        <PageTemplate title="Ventes" description="Gestion des ventes">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    <AddButton />
                </div>
            </section>
        </PageTemplate>
    );
};

export default ClientPage;
