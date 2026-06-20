import ModalProvider from "@/components/Modals/ModalProvider";
import PageTemplate from "../../_components/PageTemplate";
import GestionCategoriesRightAction from "./_components/GestionCategoriesRightAction";
import { PaginationSearchParams } from "@/app/types";
import { setTitlePage } from "@/lib/utils";
import { getCategoriesCollectionsMocks } from "./mocks/categoriesData";
import ListCategories from "./_components/table/ListCategories";


const CategoriesCollection = async ({ filter }: any) => {
    const categories = await getCategoriesCollectionsMocks();
    return (
        categories && (
            <ListCategories categories={categories?.data || []} limit={filter.limit} totalItems={categories?.totalItems} />
        )
    );
};

export const metadata = setTitlePage("Gestion des catégories");

type GestionDesCategoriesProps = {
    searchParams: Promise<PaginationSearchParams>;
};
export default async function GestionDesCategories({ searchParams }: GestionDesCategoriesProps) {

    const { page, limit, search } = await searchParams;

    const filter = { search: search || "", page: Number(page) || 1, limit: Number(limit) || 15 };
    return (
        <ModalProvider>
            <PageTemplate title="Categories" description="Gestion des categories des biens immobiliers">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                        <GestionCategoriesRightAction />
                    </div>
                    <CategoriesCollection filter={filter} />

                </section>
            </PageTemplate>
        </ModalProvider>
    );
}