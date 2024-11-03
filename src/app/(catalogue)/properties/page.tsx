import React from "react";
import SearchSection from "./_components/SearchSection";

type SearchParams = {
    searchParams: {
        id: string;
        category: string;
        search: string;
        order: "desc" | "asc";
    };
};
const PropertiesSearchPage = ({ searchParams }: SearchParams) => {
    console.log(searchParams);

    return (
        <div className="min-h-screen w-full">
            <p className="font-semibold text-2xl mb-1">Recherche de : </p>
            <p className="text-sm text-slate-500">Résultat trouvé 0</p>
            <SearchSection />
        </div>
    );
};

export default PropertiesSearchPage;
