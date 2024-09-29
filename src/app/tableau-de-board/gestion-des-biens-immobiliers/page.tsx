import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";
import ListProperties from "./_components/ListProperties";

export const metadata = setTitlePage("Gestion des biens immobiliers");
const GestionImmobilierPage = () => {
    return (
        <PageTemplate title="Immobiliers" description="Gestion des biens et les variants">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    <AddButton />
                </div>
            </section>
            <section>
                <ListProperties />
            </section>
        </PageTemplate>
    );
};

export default GestionImmobilierPage;
