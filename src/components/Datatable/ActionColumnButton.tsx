import React from "react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { Pencil, Pen, SquarePen } from "lucide-react";

type ActionColumnButtonProps = {
    onEdit?: () => void;
    onDelete?: () => void;
};
const ActionColumnButton = ({ onEdit, onDelete }: ActionColumnButtonProps) => {
    return (
        <div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEdit} className="text-primary">
                <Pen className="mr-2 h-4 w-4" />
                Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
            </DropdownMenuItem>
        </div>
    );
};

export default ActionColumnButton;
