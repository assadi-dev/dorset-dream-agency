import { isAdmin, setTitlePage, wait } from "@/lib/utils";
import React from "react";

import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import GestionCompteRightAction from "./_components/GestionCompteRightAction";
import ListAccounts from "./_components/ListAccounts";
import ModalProvider from "@/components/Modals/ModalProvider";
import { PaginationSearchParams } from "@/app/types";
import { getAccountCollections } from "@/database/drizzle/repositories/users";
import { adminAccess } from "@/lib/security";
import PageTemplate from "../../_components/PageTemplate";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export const metadata = setTitlePage("Gestion des comptes");
type GestionEmployeeParams = {
    searchParams: PaginationSearchParams;
};
const GestionEmployeePage = async ({ searchParams }: GestionEmployeeParams) => {
    const search = searchParams.search;
    const limit = Number(searchParams.limit) || 5;
    const page = Number(searchParams.page) || 1;
    const session = await auth();
    if (!isAdmin(session?.user?.role)) notFound();

    const AccountsCollections = async () => {
        const filter = { page, limit, search };
        const accounts = await getAccountCollections(filter);
        return (
            accounts && <ListAccounts accounts={accounts.data || []} limit={limit} totalItems={accounts.totalItems} />
        );
    };

    return (
        <ModalProvider>
            <PageTemplate title="Comptes" description="Gestion des comptes employées">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
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
