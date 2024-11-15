import React from "react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Pen, Trash, LockKeyhole } from "lucide-react";

type WarrantActionsProps = {
    payload: any;
};
const WarrantActions = ({ payload }: WarrantActionsProps) => {
    const handleClickEdit = () => {};
    const handleClickDelete = () => {};

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickEdit} className="text-primary">
                <Pen className="mr-2 h-4 w-4" />
                Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClickDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
            </DropdownMenuItem>
        </>
    );
};

export default WarrantActions;
