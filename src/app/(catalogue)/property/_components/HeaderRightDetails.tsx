import React from "react";
import { Separator } from "@/components/ui/separator";

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
const HeaderRightDetails = () => {
    return (
        <div className="w-full h-full  p-1 xl:flex xl:flex-col xl:justify-between bg-slate-100/50  rounded-xl border border-slate-400 ">
            <CardRightDetail title="TARIFS">
                <div className="flex flex-col  w-full text-sm lg:text-lg py-3 lg:py-5  gap-3 text-slate-500">
                    <div className="pl-5">
                        <p className="font-semibold">Prix de location</p>
                        <p className="font-bold">450$</p>
                    </div>
                    <Separator />
                    <div className="pl-5">
                        <p className="font-semibold">Prix de Vente</p>
                        <p className="font-bold">45000$</p>
                    </div>
                </div>
            </CardRightDetail>

            <CardRightDetail title="INFORMATIONS">
                <div className="p-5 text-sm lg:text-md text-slate-500 flex flex-wrap items-center justify-center gap-3">
                    <span>
                        Disponible: <strong>OUI</strong>{" "}
                    </span>
                    <span>
                        Meublé: <strong>OUI</strong>
                    </span>
                </div>
            </CardRightDetail>
        </div>
    );
};

export default HeaderRightDetails;
