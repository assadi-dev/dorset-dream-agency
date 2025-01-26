import { auth } from "@/auth";
import PageTemplate from "../../_components/PageTemplate";
import { isAdmin, setTitlePage } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import ListActionsHistory from "./_components/ListActionsHistory";

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
            <section className="my-3">
                <React.Suspense fallback={"loading"}>
                    <ListActionsHistory />
                </React.Suspense>
            </section>
        </PageTemplate>
    );
};

export default StoryActionPage;
