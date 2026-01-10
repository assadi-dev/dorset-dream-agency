import TextWithTooltip from "@/components/Text/TextWithTooltip";
import { cn } from "@/lib/utils";
import React from "react";
import { LocationStatus } from "../types";
import { STATUS_DISPLAY_NAME, STATUS_STYLES } from "../helpers";

type StatusLocationVenteProps = {
    item: {
        id: any;
        status: string;
    };
};
const StatusLocationVente = ({ item }: StatusLocationVenteProps) => {
    const status = (item.status as LocationStatus) ?? "ongoing";
    const status_name = STATUS_DISPLAY_NAME[status];
    const Component = TextWithTooltip({
        children: (
            <div className="text-center">
                <span
                    className={cn(
                        "ring-1 ring-gray-500 bg-gray-500/10 rounded-full px-3 py-0.5 text-xs lg:text-sm",
                        STATUS_STYLES[status],
                    )}
                >
                    {status_name}
                </span>
            </div>
        ),
        tooltipTitle: status_name,
    });

    return <>{Component}</>;
};

export default StatusLocationVente;
