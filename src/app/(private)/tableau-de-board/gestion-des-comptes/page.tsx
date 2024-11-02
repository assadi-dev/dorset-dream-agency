import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import GestionCompteRightAction from "./_components/GestionCompteRightAction";
import ListAccounts from "./_components/ListAccounts";
import ModalProvider from "@/components/Modals/ModalProvider";
import { getAccountCollections } from "./action";

export const metadata = setTitlePage("Gestion des comptes");
const GestionEmployeePage = async () => {
    const AccountsCollections = async () => {
        const result = (await getAccountCollections()) as Array<any>;
        return <ListAccounts accounts={result} />;
    };

    return (
        <ModalProvider>
            <PageTemplate title="Comptes" description="Gestion des comptes employées">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <SearchInputDataTable />
                        <GestionCompteRightAction />
                    </div>
                    <React.Suspense fallback={"loading"}>
                        <AccountsCollections />
                    </React.Suspense>
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default GestionEmployeePage;
