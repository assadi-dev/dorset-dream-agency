import { isAdmin, setTitlePage } from "@/lib/utils";
import React from "react";

import ModalProvider from "@/components/Modals/ModalProvider";
import { PaginationSearchParams } from "@/app/types";
import PageTemplate from "../../_components/PageTemplate";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ListPermissions from "./_components/ListPermissions";

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

    const PermissionCollections = async () => {
        const filter = { page, limit, search };
        const permissions = { data: [], totalItems: 0 }; //await getAccountCollections(filter);
        return (
            permissions && (
                <ListPermissions
                    permissions={permissions.data || []}
                    limit={limit}
                    totalItems={permissions.totalItems}
                />
            )
        );
    };

    return (
        <ModalProvider>
            <PageTemplate
                title="Gestion des permissions"
                description="Attribuez des permissions de création, d'édition et de suppression pour different grades"
            >
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                    </div>
                    <React.Suspense fallback={"loading"}>
                        <PermissionCollections />
                    </React.Suspense>
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default GestionGradePage;
