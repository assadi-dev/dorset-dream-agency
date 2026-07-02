import React from "react";
import SearchSection from "./_components/SearchSection";
import ListPropertiesResultsSection from "./ListPropertiesResults";
import { getPropertiesWithCover } from "@/database/drizzle/repositories/properties";
import { cleanDataForCarousel } from "../helper";
import OrderRowSection from "./_components/OrderSection/OrderRowSection";




type SearchParams = {
    searchParams: Promise<{
        id: string;
        category: string;
        search: string;
        order: "desc" | "asc";
        availability: string;
        isAvailable: boolean | null;
        limit: number;
        page: number;
    }>;
};

const ListPropertyResultAsync = async ({ filter }: { filter: { limit: number; page: number; search: string; availability: string; isAvailable: boolean | null; } }) => {
    if (filter.availability === "yes") filter.isAvailable = true;
    if (filter.availability === "no") filter.isAvailable = false;
    filter.limit = Number(filter.limit) || 15;
    filter.page = Number(filter.page) || 1;


    const propertiesResultCollection = await getPropertiesWithCover(filter);
    const cleanPropertiesData = propertiesResultCollection.collections.map((item) => cleanDataForCarousel(item));
    return <ListPropertiesResultsSection propertiesCollections={cleanPropertiesData} totalItems={propertiesResultCollection.totalItems} limit={filter.limit} />;
};

const PropertiesSearchPage = async ({ searchParams }: SearchParams) => {

    const { id, category, search, order, availability, isAvailable, limit, page } = await searchParams;
    const filter = { id, category, search, order, availability, isAvailable, limit, page };



    return (
        <div className="min-h-screen w-full">
            {filter.search && (
                <p className="font-semibold text-2xl mb-1">Recherche de : {filter.search} </p>
            )}

            <React.Suspense>
                <SearchSection />
                <OrderRowSection />
            </React.Suspense>
            <React.Suspense>
                <ListPropertyResultAsync filter={filter} />
            </React.Suspense>
        </div>
    );
};

export default PropertiesSearchPage;
