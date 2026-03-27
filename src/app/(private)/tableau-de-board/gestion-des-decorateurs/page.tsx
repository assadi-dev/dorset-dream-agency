import { ENV } from "@/config/global";
import { Metadata } from "next";
import PageTemplate from "../_components/PageTemplate";
import ModalProvider from "@/components/Modals/ModalProvider";
import ListDecoratorProfile from "./_components/ListDecoratorProfile";
import { getDecoratorProfileCollections } from "@/database/drizzle/repositories/decoratorProfiles";
import { PaginationSearchParams } from "@/app/types";

export const generateMetadata = () => {
    const metadata: Metadata = {
        title: `Gestion des décorateurs - ${ENV.APP_TITLE}`,
        description: `Panel d'administration de l'agence immobilier ${ENV.APP_TITLE}`,
    };

    return metadata;
};


type DecoratorCollectionsPageParams = {
    searchParams: PaginationSearchParams
};


const GestionDecorateurPage = async ({ searchParams }: DecoratorCollectionsPageParams) => {

    const DecoratorCollections = async () => {
        const page = Number(searchParams.page) || 1;
        const limit = Number(searchParams.limit) || 15;
        const search = searchParams.search || "";
        const decorators = await getDecoratorProfileCollections({ page, limit, search });
        return (
            <ListDecoratorProfile decorators={decorators.data} totalItems={decorators.totalItems} limit={limit} />
        )
    }
    return (
        <PageTemplate title="Decorateurs" description="Gestion des decorateurs">
            <ModalProvider>
                <section>
                    <DecoratorCollections />
                </section>
            </ModalProvider>
        </PageTemplate>
    )
}

export default GestionDecorateurPage