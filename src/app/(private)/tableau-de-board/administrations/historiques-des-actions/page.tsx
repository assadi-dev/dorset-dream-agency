import { auth } from "@/auth";
import PageTemplate from "../../_components/PageTemplate";
import { isAdmin, setTitlePage } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import ListActionsHistory from "./_components/ListActionsHistory";
import ModalProvider from "@/components/Modals/ModalProvider";

export const metadata = setTitlePage("Historique des actions");
const StoryActionPage = async () => {
    const session = await auth();
    const role = session?.user?.role;
    if (!isAdmin(role)) notFound();
    return (
        <PageTemplate
            title="Historique des actions"
            description="Consulter l'historique des actions de modification et de suppression effectuées par les employés."
        >
            <ModalProvider>
                <section className="my-3">
                    <ListActionsHistory />
                </section>
            </ModalProvider>
        </PageTemplate>
    );
};

export default StoryActionPage;
