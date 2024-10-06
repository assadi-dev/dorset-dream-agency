import { setTitlePage } from "@/lib/utils";
import React from "react";
import ListEmployee from "./_components/ListEmployee";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";
import ModalProvider from "@/components/Modals/ModalProvider";

export const metadata = setTitlePage("Gestion des employés");
const GestionEmployeePage = () => {
    return (
        <ModalProvider>
            <PageTemplate title="Employés" description="Gestion des employés et creations des comptes">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <SearchInputDataTable />
                    </div>
                    <ListEmployee />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default GestionEmployeePage;
