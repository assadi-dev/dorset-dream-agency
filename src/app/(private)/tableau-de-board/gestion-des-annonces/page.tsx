import { setTitlePage, wait } from "@/lib/utils";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import { adminAccess } from "@/lib/security";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ListAnnouncements from "./_components/view/ListAnnouncements";
import React from "react";
import LoadingAnnounce from "./_components/view/ListAnnouncements/LoadingAnnounce";

export const metadata = setTitlePage("Gestion des annonces");

const GestionAnnouncementPage = async () => {
    await adminAccess();

    const ListAnnouncementsAsync = async () => {
        await wait(3000);
        return <ListAnnouncements announcements={[]} />;
    };

    return (
        <PageTemplate title="Annonces" description="Gestion des annonces">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    <div className="justify-self-end">
                        <Button asChild>
                            <Link href={"/tableau-de-board/gestion-des-annonces/ajouter"}>Créer une annonce</Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section>
                <React.Suspense fallback={<LoadingAnnounce />}>
                    <ListAnnouncementsAsync />
                </React.Suspense>
            </section>
        </PageTemplate>
    );
};

export default GestionAnnouncementPage;
