"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import TextWithTooltip from "@/components/Text/TextWithTooltip";
import { useTaxeSelectedActions } from "../../_hook/useTaxeSelectedActions";
import { FORBIDDEN_ACTION } from "@/config/messages";

type TaxesSelectedActionsProps = {
    itemSelected: any[];
    resetSelectedRow: () => void;
};

export default function TaxesSelectedActions({ itemSelected, resetSelectedRow }: TaxesSelectedActionsProps) {


    const { handleClickDelete, canDelete } = useTaxeSelectedActions({ selectedItems: itemSelected, resetSelected: resetSelectedRow })
    const TOOLTIP_MESSAGE = canDelete ? "Supprimer les éléments sélectionnés" : FORBIDDEN_ACTION;
    return (
        <div>
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
        </div>
    );
}