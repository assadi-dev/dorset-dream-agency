import React from "react";
import HeaderSection from "./_components/HeaderSection";

type SearchParams = {
    searchParams: {
        id: string;
        category: string;
        search: string;
    };
};
const PropertyCatalog = ({ searchParams }: SearchParams) => {
    console.log(searchParams);

    return (
        <>
            <HeaderSection />
            <h1 className="text-lg lg:text-2xl font-semibold">Property Info</h1>
            <div className="min-h-screen"></div>
        </>
    );
};

export default PropertyCatalog;
