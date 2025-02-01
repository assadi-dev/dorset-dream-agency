import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import { RotateCcw, Info, Trash } from "lucide-react";
import React from "react";
import { UserAction, UserActionEnum } from "../types";

type ActionUserDropdownProps = {
    userActionItem: any;
};
const ActionUserDropdown = ({ userActionItem }: ActionUserDropdownProps) => {
    const { openModal } = useModalState();
    const handleClickNewVariant = () => {};
    const handleClickDelete = () => {};

    return (
        <>
            <DropdownMenuItem onClick={handleClickNewVariant} className="text-primary" disabled>
                <Info className="mr-2 h-4 w-4" /> Description détaillé
            </DropdownMenuItem>
            {userActionItem.action === "delete" && (
                <DropdownMenuItem onClick={handleClickDelete} className="text-red-600" disabled>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restaurer
                </DropdownMenuItem>
            )}
        </>
    );
};

export default ActionUserDropdown;
