import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const HeaderSection = () => {
    return (
        <header className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] gap-8 lg:items-center w-full min-h-[10vh]">
            <div className="w-full h-[280px] lg:h-[400px] bg-sky-300 p-3"></div>
            <div className="w-full lg:w-[20vw] lg:self-end flex flex-col items-center justify-center h-full">
                <div className="w-full h-full lg:grid lg:grid-rows-[50px,1fr] gap-5 p-1 flex-1 bg-slate-100/50  rounded-xl border border-slate-400 ">
                    <div className="w-full p-3 bg-slate-200/50 border border-slate-300  text-zinc-900 rounded-lg  text-center">
                        <h1 className="text-lg lg:text-xl font-semibold">TARIFS</h1>
                    </div>
                    <div className="flex flex-col  w-full   gap-3 text-slate-500">
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
                    <div className="w-full p-3 bg-slate-200/50 border border-slate-300  text-zinc-900 rounded-lg  text-center">
                        <h1 className="text-lg lg:text-xl font-semibold">INFORMATIONS</h1>
                    </div>

                    <div className="p-5 text-slate-500 flex flex-wrap items-center justify-center gap-3">
                        <span>
                            Disponible: <strong>OUI</strong>{" "}
                        </span>
                        <span>
                            Meublé: <strong>OUI</strong>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;
