import { isAdmin, setTitlePage } from "@/lib/utils";
import React from "react";

import ModalProvider from "@/components/Modals/ModalProvider";
import { PaginationSearchParams } from "@/app/types";

import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ListGrades from "./_components/ListGrades";
import PageTemplate from "../_components/PageTemplate";

export const metadata = setTitlePage("Gestion des grades");
type GestionGradePageParams = {
    searchParams: PaginationSearchParams;
};
const GestionGradePage = async ({ searchParams }: GestionGradePageParams) => {
    const search = searchParams.search;
    const limit = Number(searchParams.limit) || 5;
    const page = Number(searchParams.page) || 1;
    const session = await auth();
    if (!isAdmin(session?.user?.role)) notFound();

    const GradesCollections = async () => {
        const filter = { page, limit, search };
        const grades = { data: [], totalItems: 0 }; //await getAccountCollections(filter);
        return grades && <ListGrades grades={grades.data || []} limit={limit} totalItems={grades.totalItems} />;
    };

    return (
        <ModalProvider>
            <PageTemplate title="Grades" description="Gestion des grades">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                    </div>
                    <React.Suspense fallback={"loading"}>
                        <GradesCollections />
                    </React.Suspense>
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default GestionGradePage;
