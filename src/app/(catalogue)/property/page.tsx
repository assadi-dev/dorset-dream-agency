import React from "react";
import HeaderSection from "./_components/HeaderSection";
import DescriptionProperty from "./_components/DescriptionProperty";
import { Separator } from "@/components/ui/separator";

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
            <div className="mt-6">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold ">Property Info</h1>
                <p className="text-slate-500 text-xs lg:text-lg mt-1"> Adresse</p>
            </div>

            <div className="min-h-[35vh] xl:max-w-[62vw] ">
                <Separator className="my-6" />
                <DescriptionProperty />
            </div>
        </>
    );
};

export default PropertyCatalog;
