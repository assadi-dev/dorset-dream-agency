import React from "react";
type PropertyBadgesProps = {
    isAvailable: boolean;
    isFurnish: boolean;
};

export const FurnishBadge = ({ isFurnish }: { isFurnish: boolean }) => {
    const FURNISH_LABEL_ = isFurnish ? "Meublé" : "Vide";

    return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400">
            {FURNISH_LABEL_}
        </span>
    );
};

export const AvailableBadge = ({ isAvailable }: { isAvailable: boolean }) => {
    const AVAILABLE_LABEL = isAvailable ? "Disponible" : "Indisponible";

    const CLASS_BADGE = isAvailable
        ? `bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400`
        : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400";
    return <span className={CLASS_BADGE}>{AVAILABLE_LABEL}</span>;
};

export const PropertyBadges = ({ isAvailable, isFurnish }: PropertyBadgesProps) => {
    return (
        <div className="flex items-center gap-1">
            <FurnishBadge isFurnish={isAvailable} />
            <AvailableBadge isAvailable={isFurnish} />
        </div>
    );
};