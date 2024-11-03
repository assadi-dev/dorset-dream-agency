import React from "react";
import SearchSection from "./_components/SearchSection";
import ListPropertiesResultsSection from "./ListPropertiesResults";
import { getPropertiesWithCover } from "@/database/drizzle/repositories/properties";
import { cleanDataForCarousel } from "../helper";

type SearchParams = {
    searchParams: {
        id: string;
        category: string;
        search: string;
        order: "desc" | "asc";
    };
};
const PropertiesSearchPage = ({ searchParams }: SearchParams) => {
    const ListPropertyResultAsync = async () => {
        const propertiesResultCollection = await getPropertiesWithCover(searchParams);
        const cleanPropertiesData = propertiesResultCollection.map((item) => cleanDataForCarousel(item));
        return <ListPropertiesResultsSection propertiesCollections={cleanPropertiesData} />;
    };

    return (
        <div className="min-h-screen w-full">
            <p className="font-semibold text-2xl mb-1">Recherche de : </p>
            <p className="text-sm text-slate-500">Résultat trouvé 0</p>

            <React.Suspense>
                <SearchSection />
            </React.Suspense>
            <React.Suspense>
                <ListPropertyResultAsync />
            </React.Suspense>
        </div>
    );
};

export default PropertiesSearchPage;
