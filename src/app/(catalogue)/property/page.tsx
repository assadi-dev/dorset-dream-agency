import React from "react";
import HeaderSection from "./_components/HeaderSection";
import DescriptionProperty from "./_components/DescriptionProperty";
import { Separator } from "@/components/ui/separator";
import { getPropertyDetailForCatalogueWithGallery } from "@/database/drizzle/repositories/properties";
import { formatTitlePage, setTitlePage } from "@/lib/utils";

type SearchParams = {
    searchParams: {
        id: string;
        category: string;
        search: string;
    };
};

export const metadata = setTitlePage();

const PropertyCatalog = async ({ searchParams }: SearchParams) => {
    const variantID = searchParams.id;
    const property = await getPropertyDetailForCatalogueWithGallery(Number(variantID));
    metadata.title = formatTitlePage(property.name);
    return (
        <>
            <HeaderSection />
            <div className="mt-6">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold ">{property.name}</h1>
                <p className="text-slate-500 text-xs lg:text-lg mt-1">
                    {" "}
                    {property.address || "Adresse non renseigné"}{" "}
                </p>
            </div>

            <div className="min-h-[35vh] xl:max-w-[62vw] ">
                <Separator className="my-6" />
                <DescriptionProperty description={property.description} />
            </div>
        </>
    );
};

export default PropertyCatalog;
