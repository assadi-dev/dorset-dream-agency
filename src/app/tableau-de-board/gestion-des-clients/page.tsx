import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";
import ListeClients from "./_components/ListeClients";
import ModalProvider from "@/components/Modals/ModalProvider";
import ClientPageRightAction from "./_components/ClientPageRightAction";
import { getClientsCollections } from "./actions";
import { notFound } from "next/navigation";
import PaginationDataTable from "@/components/Datatable/PaginationDataTable";
import SimplePagination from "@/components/Paginations/SimplePagination";

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
                <section>
                    <ClientCollections />
                </section>
            </ModalProvider>
        </PageTemplate>
    );
};

export default ClientPage;
