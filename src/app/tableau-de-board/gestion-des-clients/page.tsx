import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";
import ListeClients from "./_components/ListeClients";
import ModalProvider from "@/components/Modals/ModalProvider";
import ClientPageRightAction from "./_components/ClientPageRightAction";
import { getClientsCollections } from "./actions";
import { notFound } from "next/navigation";

export const metadata = setTitlePage("Clients");
const ClientPage = async () => {
    const ClientCollections = async () => {
        const clients = await getClientsCollections();
        if (!clients) return notFound();

        return <ListeClients clients={clients} />;
    };

    return (
        <PageTemplate title="Clients" description="Gestion des client">
            <ModalProvider>
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <SearchInputDataTable />

                        <ClientPageRightAction />
                    </div>
                </section>
                <section>
                    <React.Suspense>
                        <ClientCollections />
                    </React.Suspense>
                </section>
            </ModalProvider>
        </PageTemplate>
    );
};

export default ClientPage;
