import React from "react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

type ActionColumnButtonProps = {
    onEdit?: () => void;
    onDelete?: () => void;
};
const ActionColumnButton = ({ onEdit, onDelete }: ActionColumnButtonProps) => {
    return (
        <div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEdit}>Modifier</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>Supprimer</DropdownMenuItem>
        </div>
    );
};

export default ActionColumnButton;
