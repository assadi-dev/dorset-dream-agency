import ModalProvider from "@/components/Modals/ModalProvider";
import PageTemplate from "../../_components/PageTemplate";
import GestionTaxesRightAction from "./_components/GestionTaxesRightAction";
import { setTitlePage } from "@/lib/utils";
import { PaginationSearchParams } from "@/app/types";
import { getTaxesCollectionsMocks } from "./mocks/categoriesData";
import ListTaxes from "./_components/table/ListTaxes";


export const metadata = setTitlePage("Gestion des taxes");

type GestionDesTaxesProps = {
    searchParams: Promise<PaginationSearchParams>;
};

const TaxesCollection = async ({ filter }: any) => {
    const taxes = await getTaxesCollectionsMocks();
    return (
        taxes && (
            <ListTaxes taxes={taxes?.data || []} limit={filter.limit} totalItems={taxes?.totalItems} />
        )
    );
};
export default async function GestionDesTaxes({ searchParams }: GestionDesTaxesProps) {
    const { page: pageParam, limit: limitParam, search: searchParam } = await searchParams;
    const page = Number(pageParam) || 1;
    const limit = Number(limitParam) || 15;
    const search = searchParam || "";
    const filter = { search, page, limit };

    return (
        <ModalProvider>
            <PageTemplate title="Taxes" description="Gestion des taxes">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                        <GestionTaxesRightAction />
                    </div>

                    <TaxesCollection filter={filter} />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
}