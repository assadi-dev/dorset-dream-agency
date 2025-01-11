import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ListProperties from "./_components/ListProperties";
import ModalProvider from "@/components/Modals/ModalProvider";
import GestionImmobilierRightActions from "./_components/GestionImmobilierRightActions";
import { adminAccess } from "@/lib/security";

export const metadata = setTitlePage("Gestion des biens immobiliers");

const GestionImmobilierPage = async () => {
    return (
        <ModalProvider>
            <PageTemplate title="Immobiliers" description="Gestion des biens et les variants">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <SearchInputDataTable />
                        <GestionImmobilierRightActions />
                    </div>
                </section>
                <section>
                    <ListProperties />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default GestionImmobilierPage;
