import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ListLocation from "./_components/ListLocation";
import ModalProvider from "@/components/Modals/ModalProvider";
import GestionLocationRightAction from "./_components/GestionLocationRightAction";
import { getTransactions } from "./actions";

export const metadata = setTitlePage("Location & Ventes");
const TransactionPage = async () => {
    const transactionsCollections = await getTransactions();
    return (
        <ModalProvider>
            <PageTemplate title="Location - Ventes" description="Gestion des locations et ventes">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <SearchInputDataTable />
                        <GestionLocationRightAction />
                    </div>
                </section>
                <section>
                    <ListLocation transactions={transactionsCollections} />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default TransactionPage;
