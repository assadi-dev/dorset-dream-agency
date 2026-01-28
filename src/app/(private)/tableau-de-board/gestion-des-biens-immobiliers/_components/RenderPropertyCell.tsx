import React from "react";
import { PropertiesColumn } from "../types";
import { Badge } from "@/components/ui/badge";

type RenderPropertyCellProps = {
    property: PropertiesColumn;
};
const RenderPropertyCell = ({ property }: RenderPropertyCellProps) => {
    console.log(property);
    const variantsSize = property.variants.length ?? 0;
    return (
        <div className="flex flex-col relative gap-1">
            {property.name} <BadgeRender item={variantsSize} />
        </div>
    );
};

export default RenderPropertyCell;

export const BadgeRender = ({ item }: { item: number }) => {
    if (item > 0) {
        return (
            <span className="rounded-full text-xs  text-slate-400">
                {item} variante{item > 1 ? "s" : null}
            </span>
        );
    }

    return null;
};
