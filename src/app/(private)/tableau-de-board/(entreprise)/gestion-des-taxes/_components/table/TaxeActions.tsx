"use client"

import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Pen, Trash } from "lucide-react";
import { useTaxeColumnAction } from "../../_hook/useTaxeColumnAction";



type TaxeActionsProps = {
    payload: any;
    canDelete: boolean;
    canUpdate: boolean;
    canUpload: boolean;
};
const TaxeActions = ({ payload, canDelete, canUpdate, canUpload }: TaxeActionsProps) => {
    const { handleEdit, handleDelete } = useTaxeColumnAction(payload);
    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {canUpdate && (
                <DropdownMenuItem onClick={handleEdit} className="dropdown-action-item">
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </DropdownMenuItem>
            )}
            {canDelete && (
                <DropdownMenuItem onClick={handleDelete} className="dropdown-action-danger">
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            )}
        </>
    );
};

export default TaxeActions;