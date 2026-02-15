"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { PropertyInfoType } from "../../schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleDollarSignIcon, DollarSign, Home, Sofa, Weight } from "lucide-react";
import formatThousands from "format-thousands";
import { Switch } from "@/components/ui/switch";
import { calculatePrice } from "../../helper";

type CardRightDetailProps = {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    actions?: React.ReactNode;
};
const CardDetail = ({ icon, title, children, actions }: CardRightDetailProps) => {
    return (
        <div>
            <div className="grid grid-cols-2 items-center gap-2">
                <p className="text-lg lg:text-xl font-semibold p-3 text-muted-foreground flex items-center gap-2">
                    {icon && icon} {title}
                </p>
                {actions && actions}
            </div>
            <div className="text-[0.87rem] xl:text-[1rem] flex flex-col gap-3 rounded-lg p-3 shadow-lg bg-gradient-to-br from-primary-accent">
                {children}
            </div>
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


    return (
        <Card className="w-full  p-1 xl:flex xl:flex-col xl:justify-between  shadow-lg bg-white">
            <CardHeader className="pb-0">
                <h2 className="text-2xl font-semibold text-center text-muted-foreground">
                    Aperçu des Caractéristiques
                </h2>
            </CardHeader>
            <CardContent className="flex flex-col justify-evenly  gap-3 lg:min-h-[35vh] xl:min-h-[56vh]">
                <PriceCardSection propertyInfo={propertyInfo} />

                <CardDetail icon={<Weight className="h-5 w-5" />} title="Coffre">
                    <p className="flex items-center justify-between">
                        <span>Taille de stockage:</span> <strong className="text-muted-foreground">{<Stock />}</strong>
                    </p>
                </CardDetail>

                <CardDetail icon={<Sofa className="h-5 w-5" />} title="État">
                    <p className="flex items-center justify-between">
                        <span>Disponibilité:</span> <strong className="text-muted-foreground">{isAvailable}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                        <span>Meublé:</span> <strong className="text-muted-foreground">{isFurnish}</strong>
                    </p>
                </CardDetail>
            </CardContent>
        </Card>
    );
};

export default HeaderRightDetails;



const Price = ({ price, mode }: { price?: number; mode: "location" | "vente" }) => {
    const NEGATIVE_MESSAGE = mode === "vente" ? "Non achetable" : "non louable";
    if (!price) return "Prix non définis";
    if (price === -1) return NEGATIVE_MESSAGE;
    if (price > 0) return `${formatThousands(price)}$`;
};


export const PriceCardSection = ({ propertyInfo }: { propertyInfo: PropertyInfoType }) => {
    const [state, dispatch] = React.useReducer((prev: any, action: any) => ({ ...prev, ...action }), { blaineCounty: false, sellingPrice: propertyInfo.sellingPrice, rentalPrice: propertyInfo.rentalPrice });
    const handleSwitchBlainCounty = (checked: boolean) => {
        const blaineCountyPrice = calculatePrice(propertyInfo, "Blaine County");
        const sellingPrice = checked ? blaineCountyPrice.sellingPrice : propertyInfo.sellingPrice;
        const rentalPrice = checked ? blaineCountyPrice.rentalPrice : propertyInfo.rentalPrice;
        dispatch({ blaineCounty: checked, sellingPrice, rentalPrice });

    };

    return (
        <CardDetail icon={<DollarSign className="h-5 w-5" />} title="Tarifs" actions={<label htmlFor="blaineCounty" className="text-sm font-semibold p-3 text-muted-foreground flex items-center gap-2 justify-self-end cursor-pointer hover:bg-secondary/50 rounded-lg transition-colors">Blaine County <Switch id="blaineCounty" checked={state.blaineCounty} onCheckedChange={handleSwitchBlainCounty} className="h-3.5 w-8 shadow-lg" /></label>}>
            <p className="flex items-center justify-between w-full">
                <span>Prix de vente:</span>
                <strong className="text-muted-foreground">
                    {<Price price={state.sellingPrice} mode="vente" />}
                </strong>
            </p>

            <p className="flex items-center w-full justify-between">
                <span>Prix de location:</span>
                <strong className="text-muted-foreground">
                    {<Price price={state.rentalPrice} mode="location" />}
                </strong>
            </p>
        </CardDetail>
    );
}