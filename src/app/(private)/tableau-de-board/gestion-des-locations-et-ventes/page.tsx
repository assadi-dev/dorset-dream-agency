import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ListLocation from "./_components/ListLocation";
import ModalProvider from "@/components/Modals/ModalProvider";
import GestionLocationRightAction from "./_components/GestionLocationRightAction";
import { getTransactions } from "./actions";
import { PaginationSearchParams } from "@/app/types";
import { ALL_STATUS, ALL_CATEGORIES } from "./helpers";

export const metadata = setTitlePage("Location & Ventes");

type TransactionPageParams = {
    searchParams: Promise<PaginationSearchParams & { status: string, category: string }>;
};

const TransactionPage = async (props: TransactionPageParams) => {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 5;
    const search = searchParams.search || "";
    const status = searchParams.status?.split(",") ?? ALL_STATUS;
    const category = searchParams.category && searchParams.category !== "all" ? searchParams.category.split(",").map((id) => Number(id)) : [];
    const transactionsCollections = await getTransactions({ page, limit, search, status, category });

    return (
        <ModalProvider>
            <PageTemplate title="Location - Ventes" description="Gestion des locations et ventes">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                        <GestionLocationRightAction />
                    </div>
                </section>
                <section>
                    <ListLocation
                        transactions={transactionsCollections.data}
                        limit={limit}
                        totalItems={transactionsCollections.totalItems}
                    />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default TransactionPage;
