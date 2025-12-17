import { isAdmin, setTitlePage } from "@/lib/utils";
import React from "react";

import ModalProvider from "@/components/Modals/ModalProvider";
import { PaginationSearchParams } from "@/app/types";
import PageTemplate from "../../_components/PageTemplate";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ListPermissions from "./_components/ListPermissions";
import SaverActionsPermissions from "./_components/SaverActionsPermissions";

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
        const permissions = { data: [], totalItems: 0 };
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
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center w-full ">
                        <div className="w-full">
                            <select name="" id="">
                                <option>Administrateur</option>
                                <option>Utilisateur</option>
                            </select>
                        </div>
                        <div className="items-center w-full flex justify-end">
                            <SaverActionsPermissions />
                        </div>
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
