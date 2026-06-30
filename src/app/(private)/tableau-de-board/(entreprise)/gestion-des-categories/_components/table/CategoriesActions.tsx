"use client"

import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Pen, Trash } from "lucide-react";
import { useCategorieColumnActions } from "../../_hooks/useCategorieColumnActions";

type CategoriesActionsProps = {
    payload: any;
    canDelete: boolean;
    canUpdate: boolean;
    canUpload: boolean;
};

export default function CategoriesActions({ payload, canDelete, canUpdate, canUpload }: CategoriesActionsProps) {

    const { handleClickEdit, handleClickDelete } = useCategorieColumnActions(payload, { canDelete, canUpdate });



    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {canUpdate && (
                <DropdownMenuItem onClick={handleClickEdit} className="dropdown-action-item">
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </DropdownMenuItem>
            )}
            {canDelete && (
                <DropdownMenuItem onClick={handleClickDelete} className="dropdown-action-danger">
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            )}
        </>
    );
}