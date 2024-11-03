import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropertyBadges } from "./PropertyBadge";

const PropertyCard = () => {
    return (
        <Card className="w-full p-1 h-full transition-shadow hover:shadow-lg relative">
            <div className="overflow-hidden rounded-lg relative">
                <Image
                    src={"https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg"}
                    alt={`photo`}
                    width={1200}
                    height={720}
                    className="h-auto w-full object-cover object-center rounded-lg transition-all duration-700 ease-in-out transform hover:scale-[1.2] hover:brightness-75"
                />
            </div>

            <div className="p-2 flex flex-col justify-between gap-3 relative">
                <p className="font-bold sm:text-sm lg:text-lg">Titre </p>
                <PropertyBadges isAvailable={true} isFurnish={true} />
                <div className="flex items-center justify-between  p-2 rounded-sm backdrop-blur-md">
                    <div>
                        <p className="text-xs text-slate-600">Location - Vente</p>
                        <p className="font-bold text-xs lg:text-lg">400$ - 12000$ </p>
                    </div>
                    <Button
                        asChild
                        type="button"
                        className="bg-background border hover:border-none hover:shadow-lg hover:shadow-blue-950/50 border-input text-black hover:bg-gradient-to-br from-sky-600 to-primary   duration-300   transition-colors  hover:text-white text-xs lg:text-sm"
                    >
                        <Link href={`property?id=15&name=title`}>Plus d'info</Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
};
export default PropertyCard;
