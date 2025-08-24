import React from "react";
import SearchSection from "./_components/SearchSection";
import ListPropertiesResultsSection from "./ListPropertiesResults";
import { getPropertiesWithCover } from "@/database/drizzle/repositories/properties";
import { cleanDataForCarousel } from "../helper";
import OrderRowSection from "./_components/OrderSection/OrderRowSection";

type SearchParams = {
    searchParams: {
        id: string;
        category: string;
        search: string;
        order: "desc" | "asc";
        availability: string;
        isAvailable: boolean | null;
    };
};
const PropertiesSearchPage = ({ searchParams }: SearchParams) => {
    const ListPropertyResultAsync = async () => {
        if (searchParams.availability === "yes") searchParams.isAvailable = true;
        if (searchParams.availability === "no") searchParams.isAvailable = false;

        const propertiesResultCollection = await getPropertiesWithCover(searchParams);
        const cleanPropertiesData = propertiesResultCollection.map((item) => cleanDataForCarousel(item));
        return <ListPropertiesResultsSection propertiesCollections={cleanPropertiesData} />;
    };

    return (
        <div className="min-h-screen w-full">
            {searchParams.search && (
                <p className="font-semibold text-2xl mb-1">Recherche de : {searchParams.search} </p>
            )}

            <React.Suspense>
                <SearchSection />
                <OrderRowSection />
            </React.Suspense>
            <React.Suspense>
                <ListPropertyResultAsync />
            </React.Suspense>
        </div>
    );
};

export default PropertiesSearchPage;
