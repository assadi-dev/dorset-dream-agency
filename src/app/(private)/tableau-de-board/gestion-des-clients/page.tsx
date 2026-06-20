import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import ListeClients from "./_components/ListeClients";
import ModalProvider from "@/components/Modals/ModalProvider";
import { notFound } from "next/navigation";
import { getClientsCollections } from "@/database/drizzle/repositories/clients";
import { PaginationSearchParams } from "@/app/types";
import { auth, UserSession } from "@/auth";
export const dynamic = "force-dynamic";

export const metadata = setTitlePage("Clients");

type ClientPageParams = {
    searchParams: Promise<PaginationSearchParams>;
};
const ClientPage = async ({ searchParams }: ClientPageParams) => {
    const { page, limit, search } = await searchParams;

    const session = (await auth()) as UserSession;
    const ClientCollections = async () => {
        const filter = { page: Number(page) || 1, limit: Number(limit) || 15, search: search || "" };
        const clients = await getClientsCollections(filter);
        if (!clients) return notFound();

        return (
            <ListeClients
                clients={clients.data}
                limit={filter.limit}
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
