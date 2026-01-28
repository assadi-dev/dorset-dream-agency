import React from "react";
import { PropertiesColumn } from "../types";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type RenderPropertyCellProps = {
    property: PropertiesColumn;
};
const RenderPropertyCell = ({ property }: RenderPropertyCellProps) => {
    return <BadgeRender property={property} variants={property.variants} />;
};

export default RenderPropertyCell;

export const BadgeRender = ({
    property,
    variants,
}: {
    property: { name: string };
    variants: { id: number; name: string }[];
}) => {
    const item = variants.length ?? 0;
    if (item > 0) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={item < 1} className="cursor-pointer">
                    <div className="flex flex-col relative gap-1">
                        {property.name}
                        <div className="rounded-full text-xs  text-slate-400 cursor-pointer">
                            {item} variante{item > 1 ? "s" : null}
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-[52vw]">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-slate-400 text-center">
                            Variante{item > 1 ? "s" : null}
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <ScrollArea className=" max-h-[20vh] w-[18vw] overflow-y-auto rounded pb-2">
                        {variants?.map((v) => (
                            <DropdownMenuItem
                                key={v.id}
                                className="text-nowrap w-full focus:!bg-transparent bg-secondary my-1 text-xs"
                            >
                                {v.name ? v.name : "anonyme"}{" "}
                            </DropdownMenuItem>
                        ))}
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return null;
};
