import React from "react";
import { Separator } from "@/components/ui/separator";
import { PropertyInfoType } from "../../schema";

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
    console.log(propertyInfo.stock);

    const isAvailable = propertyInfo.isAvailable ? "OUI" : "NON";
    const isFurnish = propertyInfo.isFurnish ? "OUI" : "NON";
    const Stock = () => {
        if (typeof propertyInfo.stock === "number") {
            if (propertyInfo.stock === -1) return "Sur demande au sénat";
            if (propertyInfo.stock > 0) return `${propertyInfo.stock} kg`;
            else return "Pas de coffre";
        } else {
            return "Pas de coffre";
        }
    };

    const Price = ({ price, mode }: { price?: number; mode: "location" | "vente" }) => {
        const NEGATIVE_MESSAGE = mode === "vente" ? "Non achetable" : "non louable";
        if (!price) return "Prix non définis";
        if (price === -1) return NEGATIVE_MESSAGE;
        if (price > 0) return `${price}$`;
    };

    return (
        <div className="w-full h-full  p-1 xl:flex xl:flex-col xl:justify-between bg-slate-100/50  rounded-xl border border-slate-400 ">
            <CardRightDetail title="TARIFS">
                <div className="flex flex-col  w-full text-sm lg:text-lg py-3 lg:py-5  gap-3 text-slate-500">
                    <div className="pl-5">
                        <p className="font-semibold">Prix de location</p>
                        <p className="font-bold">
                            <Price price={propertyInfo.rentalPrice} mode="location" />
                        </p>
                    </div>
                    <Separator />
                    <div className="pl-5">
                        <p className="font-semibold">Prix de Vente</p>
                        <p className="font-bold">
                            <Price price={propertyInfo.sellingPrice} mode="vente" />
                        </p>
                    </div>
                    <Separator />
                </div>
            </CardRightDetail>
            <CardRightDetail title="Coffre">
                <div className="flex flex-col  w-full text-sm lg:text-lg py-3 lg:py-5  gap-3 text-slate-500">
                    <p className=" text-sm lg:text-lg font-semibold text-center">{<Stock />}</p>
                </div>
            </CardRightDetail>

            <CardRightDetail title="INFORMATIONS">
                <div className="p-5 text-sm lg:text-md text-slate-500 flex flex-wrap items-center justify-center gap-3">
                    <span>
                        Disponible: <strong>{isAvailable || "Non renseigné"}</strong>{" "}
                    </span>
                    <span>
                        Meublé: <strong>{isFurnish || "Non renseigné"}</strong>
                    </span>
                </div>
            </CardRightDetail>
        </div>
    );
};

export default HeaderRightDetails;
