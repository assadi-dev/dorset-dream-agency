import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropertyBadges } from "./PropertyBadge";

type PropertyItemType = {
    id: number;
    name: string;
    cover: string;
    photo: string;
    category: {
        id: number;
        name: string;
    };
    rentalPrice: number;
    sellingPrice: number;
    isFurnish: boolean;
};
type PropertyCardProps = {
    property: PropertyItemType;
};
const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <Card className="w-full p-1 h-full transition-shadow hover:shadow-lg relative">
            <div className="overflow-hidden rounded-lg relative">
                <Image
                    src={property.cover}
                    alt={`cover of property ${property.name}`}
                    width={1200}
                    height={720}
                    className="h-auto w-full object-cover object-center rounded-lg transition-all duration-700 ease-in-out transform hover:scale-[1.2] hover:brightness-75"
                />
            </div>

            <div className="p-2 flex flex-col justify-between gap-3 relative">
                <p className="font-bold sm:text-sm lg:text-lg">{property.name} </p>
                <PropertyBadges isAvailable={false} isFurnish={property.isFurnish} />
                <div className="flex items-center justify-between  p-2 rounded-sm backdrop-blur-md">
                    <div>
                        <p className="text-xs text-slate-600">Location - Vente</p>
                        <p className="font-bold text-xs lg:text-lg">
                            {property.rentalPrice}$ - {property.sellingPrice}${" "}
                        </p>
                    </div>
                    <Button
                        asChild
                        type="button"
                        className="bg-background border hover:border-none hover:shadow-lg hover:shadow-blue-950/50 border-input text-black hover:bg-gradient-to-br from-sky-600 to-primary   duration-300   transition-colors  hover:text-white text-xs lg:text-sm"
                    >
                        <Link href={`property?id=${property.id}&name=${property.name}`}>Plus d'info</Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
};
export default PropertyCard;
