import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropertyBadges } from "./PropertyBadge";
import { HandCoins, Handshake } from "lucide-react";
import formatThousands from "format-thousands";

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
    isAvailable: boolean;
    stock?: number | null;
};
type PropertyCardProps = {
    property: PropertyItemType;
};
const PropertyCard = ({ property }: PropertyCardProps) => {
    const sellingPrice =
        property.sellingPrice !== -1 ? (
            formatThousands(property.sellingPrice) + "$"
        ) : (
            <span className="px-2 py-1 ring-1 ring-destructive rounded text-xs lg:text-sm  text-destructive bg-red-100">
                Non achetable
            </span>
        );

    return (
        <Card className="propertyBox group w-full p-1 h-full transition-shadow hover:shadow-lg relative">
            <div className="overflow-hidden rounded-lg relative h-[180px] lg:h-[250px]">
                <Image
                    src={property.cover}
                    alt={`cover of property ${property.name}`}
                    width={1200}
                    height={720}
                    className="h-full w-full object-cover object-center rounded-lg transition-all duration-700 ease-in-out transform group-hover:scale-[1.2] group-hover:brightness-75"
                />
            </div>

            <div className="p-2 flex flex-col justify-between gap-3 relative">
                <p className="font-bold sm:text-sm lg:text-lg text-nowrap text-ellipsis max-w-[80%] overflow-hidden">
                    {property.name}
                </p>
                <PropertyBadges
                    isAvailable={property.isAvailable}
                    isFurnish={property.isFurnish}
                    stock={property.stock}
                />
                <div className="flex flex-col lg:flex-row items-center justify-between  p-2 rounded-sm backdrop-blur-md w-full gap-3">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm text-slate-600 flex justify-between items-center w-full">
                            <span>
                                {" "}
                                <HandCoins className="w-4 h-4 inline-block mr-1" /> Location:{" "}
                            </span>
                            <span className="font-semibold">{formatThousands(property.rentalPrice)}$</span>
                        </p>
                        <p className="text-sm text-slate-600 flex justify-between items-center w-full">
                            <span>
                                {" "}
                                <Handshake className="w-4 h-4 inline-block mr-1" /> Vente:{" "}
                            </span>
                            <span className="font-semibold">{sellingPrice}</span>
                        </p>
                    </div>
                </div>
                <Button
                    asChild
                    variant={"default"}
                    type="button"
                    className="bg-gradient-to-br from-black to-primary !text-white lg:bg-background border hover:border-none hover:shadow-lg lg:hover:shadow-blue-950/50 border-input lg:text-black hover:bg-gradient-to-br   duration-300   transition-all  lg:hover:text-white text-xs lg:text-sm w-full "
                >
                    <Link href={`property?id=${property.id}&name=${property.name}`}>Plus d'info</Link>
                </Button>
            </div>
        </Card>
    );
};
export default PropertyCard;
