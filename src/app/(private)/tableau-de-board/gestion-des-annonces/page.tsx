import { setTitlePage } from "@/lib/utils";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

export const metadata = setTitlePage("Gestion des annonces");

export const GestionAnnouncement = async () => {
    return (
        <PageTemplate title="Annonces" description="Gestion des annonces">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                </div>
            </section>
            <section></section>
        </PageTemplate>
    );
};

export default GestionAnnouncement;