import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";
import ListeClients from "./_components/ListeClients";
import ModalProvider from "@/components/Modals/ModalProvider";
import ClientPageRightAction from "./_components/ClientPageRightAction";

import { notFound } from "next/navigation";
import PaginationDataTable from "@/components/Datatable/PaginationDataTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { getClientsCollections } from "@/database/drizzle/repositories/clients";

export const metadata = setTitlePage("Clients");

type ClientPageParams = {
    searchParams: {
        search: string;
        limit: string;
        page: string;
    };
};
const ClientPage = async ({ searchParams }: ClientPageParams) => {
    console.log(searchParams);
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 15;
    const search = searchParams.search || "";

    const ClientCollections = async () => {
        const filter = { page, limit, search };
        const clients = await getClientsCollections(filter);
        if (!clients) return notFound();

        return <ListeClients clients={clients.data} limit={limit} totalItems={clients.totalItems} />;
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
