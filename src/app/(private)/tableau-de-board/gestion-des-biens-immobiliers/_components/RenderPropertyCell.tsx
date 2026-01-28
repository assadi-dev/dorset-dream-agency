import React from "react";
import { PropertiesColumn } from "../types";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
                <DropdownMenuTrigger asChild disabled={item < 1}>
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
                    <DropdownMenuItem className=" flex no-wrap gap-2 focus:!bg-transparent">
                        {variants?.map((v) => (
                            <Badge key={v.id} variant="secondary">
                                {v.name ? v.name : "anonyme"}{" "}
                            </Badge>
                        ))}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return null;
};
