import React from "react";
import HeaderPhotoSlides from "./HeaderPhotoSlides";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideMapPin } from "lucide-react";
import DescriptionProperty from "./DescriptionProperty";
import GoBackButton from "@/app/(private)/tableau-de-board/_components/GoBackButton";

type DescriptionLeftColProps = {
    property: {
        name: string;
        address?: string | null;
        description?: string | null;
        gallery: any;
    };
};
const DescriptionLeftCol = ({ property }: DescriptionLeftColProps) => {
    return (
        <div className="w-full flex flex-col gap-5">
            <HeaderPhotoSlides propertyName={property.name} gallery={property.gallery} />
            <Card className="shadow-xl bg-white">
                <CardHeader className="mt-6">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold ">{property.name}</h1>
                    <p className="text-slate-500 text-xs lg:text-lg mt-1">
                        <LucideMapPin className="inline-block mr-2" />
                        {property.address || "Adresse non renseigné"}{" "}
                    </p>
                </CardHeader>

                <CardContent>
                    <DescriptionProperty description={property.description} />
                </CardContent>
            </Card>
        </div>
    );
};

export default DescriptionLeftCol;
