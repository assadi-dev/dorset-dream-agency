import { SecteurType } from "@/app/types/employee";
import { SAN_ANDREAS_IMAGE, ILES_GALAPAGOS_IMAGE } from "@/config/image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { SECTEUR_OBJECT_LOGO } from "../helper";

type SecteurLogoProps = {
    secteurs?: SecteurType[];
};
const SecteurLogo = ({ secteurs }: SecteurLogoProps) => {
    const CLASS = ["rounded-full w-8 h-8 shadow-inner shadow-white ring-1"];
    if (secteurs && secteurs.length > 1) CLASS.push("first-of-type:mr-[-5px]");

    return (
        <div className="flex">
            {secteurs &&
                secteurs?.map((secteur) => (
                    <Image
                        key={secteur}
                        src={SECTEUR_OBJECT_LOGO[secteur]}
                        alt={`secteur logo of ${secteur}`}
                        width={250}
                        height={250}
                        className={cn(CLASS)}
                        title={secteur}
                    />
                ))}
        </div>
    );
};

export default SecteurLogo;
