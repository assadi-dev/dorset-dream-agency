import React from "react";

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
        <div className="min-h-screen">
            <h1 className="text-lg lg:text-2xl font-semibold">Property Info</h1>
        </div>
    );
};

export default PropertyCatalog;
