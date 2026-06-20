import React from "react";

import { getPropertyDetailForCatalogueWithGallery } from "@/database/drizzle/repositories/properties";
import { formatTitlePage, setTitlePage } from "@/lib/utils";
import DescriptionLeftCol from "./_components/DescriptionLeftCol";
import DescriptionRightCol from "./_components/DescriptionRightCol";
import GoBackButton from "@/app/(private)/tableau-de-board/_components/GoBackButton";
import { redirect } from "next/navigation";

type SearchParams = {
    searchParams: Promise<{
        id: string;
        category: string;
        search: string;
    }>;
};



export async function generateMetadata({ searchParams }: SearchParams) {
    const { id } = await searchParams;
    if (!id) redirect("/properties");
    const property = await getPropertyDetailForCatalogueWithGallery(Number(id));
    return setTitlePage(property.name);
}

const PropertyCatalog = async ({ searchParams }: SearchParams) => {
    const { id, category, search } = await searchParams;
    if (!id) redirect("/properties");
    const property = await getPropertyDetailForCatalogueWithGallery(Number(id));


    return (
        <>
            <div className="flex items-center gap-5  pb-5 lg:pb-3">
                <GoBackButton />{" "}
                <h1 className="text-xl  md:text-2xl lg:text-3xl font-bold truncate  w-full">{property.name}</h1>
            </div>
            <div className="grid grid-rows-[repeat(auto-fit,minmax(auto,1fr))] grid-cols-1 gap-5  lg:grid-cols-[55vw,1fr] lg:gap-3">
                <DescriptionLeftCol property={property} />
                <DescriptionRightCol property={property} />
            </div>
        </>
    );
};

export default PropertyCatalog;
