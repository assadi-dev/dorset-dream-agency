import { auth, UserSession } from "@/auth";
import PageTemplate from "../../_components/PageTemplate";
import { isAdmin, setTitlePage } from "@/lib/utils";
import { notFound } from "next/navigation";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import React from "react";
import RightActions from "./_components/RightActions";

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
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] py-6 items-center gap-3">
                    <SearchInputDataTable />
                    <RightActions />
                </div>
                <React.Suspense fallback={"loading"}></React.Suspense>
            </section>
        </PageTemplate>
    );
};

export default StoryActionPage;
