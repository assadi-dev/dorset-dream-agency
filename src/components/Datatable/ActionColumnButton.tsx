import React from "react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import { ActionPermission } from "@/app/types/user";

type ActionColumnButtonProps = {
    onEdit?: () => void;
    onDelete?: () => void;
} & ActionPermission;
const ActionColumnButton = ({ onEdit, onDelete, canDelete, canUpdate }: ActionColumnButtonProps) => {
    return (
        <div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {canUpdate && (
                <DropdownMenuItem onClick={onEdit} className="text-primary">
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </DropdownMenuItem>
            )}
            {canDelete && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            )}
        </div>
    );
};

export default ActionColumnButton;
