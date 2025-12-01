import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import React from "react";
import { ActionComponentsProps } from "../../../types";

type VariantSelectActionsProps = {
    actionListHandlers: ActionComponentsProps[];
};
const VariantSelectActions = ({ actionListHandlers }: VariantSelectActionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" aria-label="Open menu" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actionListHandlers.map((action) => (
                    <ActionComponents
                        key={action.label}
                        label={action.label}
                        lucidIcon={action.lucidIcon}
                        isDanger={action.isDanger}
                        handler={action.handler}
                    />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default VariantSelectActions;

const ActionComponents = ({ label, lucidIcon, handler, isDanger = false }: ActionComponentsProps) => {
    const IconAction = lucidIcon;

    return (
        <DropdownMenuItem
            className={cn("flex gap-2  items-center", {
                "text-destructive": isDanger,
            })}
            onClick={handler}
        >
            <IconAction className="w-4 h-4" /> {label}
        </DropdownMenuItem>
    );
};
