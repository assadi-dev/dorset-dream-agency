"use client"

import TextWithTooltip from "@/components/Text/TextWithTooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FORBIDDEN_ACTION } from "@/config/messages";
import { Trash2 } from "lucide-react";
import { useCategoriesSelectedActions } from "../../_hooks/useCategoriesSelectedActions";

type CategoriesSelectedActionsProps = {
    itemSelected: any[];
    resetSelectedRow: () => void;
};

export default function CategoriesSelectedActions({ itemSelected, resetSelectedRow }: CategoriesSelectedActionsProps) {

    const { handleClickDelete, canDelete } = useCategoriesSelectedActions({ selectedItems: itemSelected, resetSelected: resetSelectedRow })

    const TOOLTIP_MESSAGE = canDelete ? "Supprimer les éléments sélectionnés" : FORBIDDEN_ACTION;



    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button size={"sm"} variant={"outline"}>
                        Actions
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleClickDelete} disabled={!canDelete} className="dropdown-action-danger">
                        <TextWithTooltip tooltipTitle={TOOLTIP_MESSAGE}>
                            {" "}
                            <p className="flex gap-2 items-center">
                                {" "}
                                <Trash2 width={"1rem"} height={"1rem"} /> Supprimer
                            </p>
                        </TextWithTooltip>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}