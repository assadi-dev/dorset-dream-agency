import React from "react";
import { Separator } from "@/components/ui/separator";
import { PropertyInfoType } from "../../schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleDollarSignIcon, DollarSign } from "lucide-react";
import formatThousands from "format-thousands";

type CardRightDetailProps = {
    title: string;
    children: React.ReactNode;
};
const CardRightDetail = ({ title, children }: CardRightDetailProps) => {
    return (
        <div>
            <div className="w-full p-1 lg:p-3 bg-slate-200/50 border border-slate-300  text-zinc-900 rounded-lg  text-center">
                <h1 className="text-lg lg:text-xl font-semibold">{title}</h1>
            </div>
            {children}
        </div>
    );
};
type HeaderRightDetails = {
    propertyInfo: PropertyInfoType;
};
const HeaderRightDetails = ({ propertyInfo }: HeaderRightDetails) => {
    const isAvailable = propertyInfo.isAvailable ? "OUI" : "NON";
    const isFurnish = propertyInfo.isFurnish ? "OUI" : "NON";
    const Stock = () => {
        if (typeof propertyInfo.stock === "number") {
            if (propertyInfo.stock === -1) return "Sur demande au sénat";
            if (propertyInfo.stock > 0) return `${formatThousands(propertyInfo.stock)} kg`;
            else return "Pas de coffre";
        } else {
            return "Pas de coffre";
        }
    };

    const Price = ({ price, mode }: { price?: number; mode: "location" | "vente" }) => {
        const NEGATIVE_MESSAGE = mode === "vente" ? "Non achetable" : "non louable";
        if (!price) return "Prix non définis";
        if (price === -1) return NEGATIVE_MESSAGE;
        if (price > 0) return `${formatThousands(price)}$`;
    };

    return (
        <Card className="w-full  p-1 xl:flex xl:flex-col xl:justify-between  shadow-lg bg-white">
            <CardHeader className="pb-0">
                <h2 className="text-2xl font-semibold text-center text-muted-foreground">
                    Aperçu des Caractéristiques
                </h2>
            </CardHeader>
            <CardContent className="flex flex-col justify-evenly  gap-3 lg:min-h-[35vh] xl:min-h-[56vh]">
                <div>
                    <p className="text-lg lg:text-xl font-semibold p-3 text-muted-foreground">Tarifs</p>
                    <div className="text-[0.87rem] xl:text-[1rem] flex flex-col gap-3 rounded-lg p-3 shadow-lg bg-gradient-to-br from-primary-accent">
                        <p className="flex items-center justify-between w-full">
                            <span>Prix de vente:</span>{" "}
                            <strong className="text-muted-foreground">
                                {<Price price={propertyInfo.sellingPrice} mode="vente" />}
                            </strong>
                        </p>

                        <p className="flex items-center w-full justify-between">
                            <span>Prix de location:</span>{" "}
                            <strong className="text-muted-foreground">
                                {<Price price={propertyInfo.rentalPrice} mode="location" />}
                            </strong>
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-lg lg:text-xl font-semibold p-3 text-muted-foreground">Coffre</p>
                    <div className="text-[0.87rem] xl:text-[1rem] flex flex-col gap-3 rounded-lg p-3 shadow-lg bg-gradient-to-br from-primary-accent">
                        <p className="flex items-center justify-between">
                            <span>Taille de stockage:</span>{" "}
                            <strong className="text-muted-foreground">{<Stock />}</strong>
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-lg lg:text-xl font-semibold p-3 text-muted-foreground">État</p>
                    <div className="text-[0.87rem] xl:text-[1rem] flex flex-col gap-3 rounded-lg p-3 shadow-lg bg-gradient-to-br from-primary-accent">
                        <p className="flex items-center justify-between">
                            <span>Disponibilité:</span> <strong className="text-muted-foreground">{isAvailable}</strong>
                        </p>
                        <p className="flex items-center justify-between">
                            <span>Meublé:</span> <strong className="text-muted-foreground">{isFurnish}</strong>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HeaderRightDetails;
