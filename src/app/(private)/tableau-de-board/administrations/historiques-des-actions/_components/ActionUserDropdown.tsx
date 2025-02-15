import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import { RotateCcw, Info, Trash } from "lucide-react";
import React from "react";
import { ActionDescription, UserAction, UserActionEnum } from "../types";
import ActionDetailView from "./views/ActionDetailView";

type ActionUserDropdownProps = {
    userActionItem: any;
};
const ActionUserDropdown = ({ userActionItem }: ActionUserDropdownProps) => {
    const { openModal } = useModalState();
    const handleClickDetailView = () => {
        openModal({
            title: "Description détaillé",
            description: userActionItem?.name,
            component: ActionDetailView,
            payload: userActionItem,
        });
    };
    const handleClickRestore = () => {};

    const extras = userActionItem.extras;

    console.log(extras);

    return (
        <>
            <DropdownMenuItem onClick={handleClickDetailView} className="text-primary">
                <Info className="mr-2 h-4 w-4" /> Description détaillé
            </DropdownMenuItem>
            {userActionItem.action === "delete" && (
                <DropdownMenuItem onClick={handleClickRestore} className="text-red-600" disabled>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restaurer
                </DropdownMenuItem>
            )}
        </>
    );
};

export default ActionUserDropdown;
