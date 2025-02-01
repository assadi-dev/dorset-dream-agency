import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import ListeClients from "./_components/ListeClients";
import ModalProvider from "@/components/Modals/ModalProvider";
import { notFound } from "next/navigation";
import { getClientsCollections } from "@/database/drizzle/repositories/clients";
import { PaginationSearchParams } from "@/app/types";
import { auth, UserSession } from "@/auth";

export const metadata = setTitlePage("Clients");

type ClientPageParams = {
    searchParams: PaginationSearchParams;
};
const ClientPage = async ({ searchParams }: ClientPageParams) => {
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 15;
    const search = searchParams.search || "";

    const session = (await auth()) as UserSession;
    const ClientCollections = async () => {
        const filter = { page, limit, search };
        const clients = await getClientsCollections(filter);
        if (!clients) return notFound();

        return (
            <ListeClients
                clients={clients.data}
                limit={limit}
                totalItems={clients.totalItems}
                role={session.user.role}
            />
        );
    };

    return (
        <PageTemplate title="Clients" description="Gestion des clients">
            <ModalProvider>
                <section>
                    <ClientCollections />
                </section>
            </ModalProvider>
        </PageTemplate>
    );
};

export default ClientPage;
