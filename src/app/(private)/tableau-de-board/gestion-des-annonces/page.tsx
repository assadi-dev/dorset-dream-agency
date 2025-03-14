import { setTitlePage, wait } from "@/lib/utils";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import { adminAccess } from "@/lib/security";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ListAnnouncements from "./_components/view/ListAnnouncements";
import React from "react";
import LoadingAnnounce from "./_components/view/ListAnnouncements/LoadingAnnounce";
import { getAnnounceCollections } from "@/database/drizzle/repositories/announcements";

export const metadata = setTitlePage("Gestion des annonces");

type GestionAnnouncementPageProps = {
    searchParams: { search: string; limit: string; page: string };
};

const GestionAnnouncementPage = async ({ searchParams }: GestionAnnouncementPageProps) => {
    const ListAnnouncementsAsync = async () => {
        const search = searchParams.search || "";
        const limit = Number(searchParams.limit) || 15;
        const page = Number(searchParams.page) || 1;
        const filter = { search, limit, page };

        const announcements = await getAnnounceCollections(filter);
        return <ListAnnouncements announcements={announcements?.data || []} />;
    };

    return (
        <PageTemplate title="Annonces" description="Gestion des annonces">
            <section className="my-3 ">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] p-3 items-center">
                    <SearchInputDataTable
                        classNames={{
                            input: "bg-green-950/25 ",
                            icon: "!text-primary-accent",
                        }}
                    />
                    <div className="justify-self-end ">
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
