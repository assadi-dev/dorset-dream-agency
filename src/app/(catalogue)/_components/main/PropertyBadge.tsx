import { cn } from "@/lib/utils";
import { CircleCheck, CircleCheckBig, CircleX, SofaIcon, Weight } from "lucide-react";
import React from "react";
type PropertyBadgesProps = {
    isAvailable: boolean;
    isFurnish: boolean;
    stock?: number | null;
};

export const FurnishBadge = ({ isFurnish }: { isFurnish: boolean }) => {
    const FURNISH_LABEL_ = isFurnish ? "Meublé" : "Vide";

    return (
        <p className="flex items-center gap-1  text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded  border border-gray-400">
            <SofaIcon className="h-3.5 w-3.5 inline-block" />
            <span> {FURNISH_LABEL_}</span>
        </p>
    );
};

export const AvailableBadge = ({ isAvailable }: { isAvailable: boolean }) => {
    const AVAILABLE_LABEL = isAvailable ? "Disponible" : "Indisponible";

    const CLASS_BADGE = `flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400`;
    const ICON_CLASS = `h-3.5 w-3.5`;
    return (
        <p
            className={cn(CLASS_BADGE, {
                "bg-red-100 text-red-800": !isAvailable,
                "text-red-800": !isAvailable,
                "dark:text-red-400": !isAvailable,
                "border border-red-400": !isAvailable,
            })}
        >
            {isAvailable ? <CircleCheck className={ICON_CLASS} /> : <CircleX className={ICON_CLASS} />}
            {AVAILABLE_LABEL}
        </p>
    );
};

export const StockageBadges = ({ stock }: { stock: number | null }) => {
    const STOCK_LABEL = (stock && stock > 0 && `${stock} kg`) || "Pas de coffre";
    return (
        <p className="flex items-center gap-1  text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-gray-400">
            <Weight className="w-3 h-3" />
            <span>{STOCK_LABEL}</span>
        </p>
    );
};

export const PropertyBadges = ({ isAvailable, isFurnish, stock }: PropertyBadgesProps) => {
    return (
        <div className="flex items-center gap-1 flex-wrap ">
            <FurnishBadge isFurnish={isFurnish} />
            {typeof stock === "number" && stock >= 0 ? <StockageBadges stock={stock} /> : null}
            {/*   <AvailableBadge isAvailable={isAvailable} /> */}
        </div>
    );
};
