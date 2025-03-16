import React from "react";
import HeaderSection from "./_components/HeaderSection";
import DescriptionProperty from "./_components/DescriptionProperty";
import { Separator } from "@/components/ui/separator";
import { getPropertyDetailForCatalogueWithGallery } from "@/database/drizzle/repositories/properties";
import { formatTitlePage, setTitlePage } from "@/lib/utils";
import { LucideMapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HeaderPhotoSlides from "./_components/HeaderPhotoSlides";
import DescriptionLeftCol from "./_components/DescriptionLeftCol";
import { extractDataForInfo } from "../schema";
import HeaderRightDetails from "./_components/HeaderRightDetails";
import DescriptionRightCol from "./_components/DescriptionRightCol";

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
            <div className="grid grid-rows-[repeat(auto-fit,minmax(auto,1fr))] grid-cols-1 gap-5  lg:grid-cols-[55vw,1fr] lg:gap-3">
                <DescriptionLeftCol property={property} />
                <DescriptionRightCol property={property} />
            </div>
        </>
    );
};

export default PropertyCatalog;
