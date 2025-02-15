"use client";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import { RotateCcw, Info, Trash } from "lucide-react";
import React from "react";
import { ActionDescription, UserAction, UserActionEnum } from "../types";
import ActionDetailView from "./views/ActionDetailView";
import { restoreFunctions } from "../../corbeille/helpers";
import RestoreViewConfirm from "./views/RestoreViewConfirm";

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
    const description = JSON.parse(userActionItem.description);
    const entity = userActionItem.entity as keyof typeof restoreFunctions;

    const handleClickRestore = async () => {
        openModal({
            title: "Restauration des données",
            description: `Restaurer l'action: ${description.description}`,
            component: RestoreViewConfirm,
            payload: { entity, description: description.description, ...description.extras },
        });
    };

    return (
        <>
            <DropdownMenuItem onClick={handleClickDetailView} className="text-primary">
                <Info className="mr-2 h-4 w-4" /> Description détaillé
            </DropdownMenuItem>
            {userActionItem.action === "delete" && (
                <DropdownMenuItem onClick={handleClickRestore} className="text-red-600" disabled={!description.extras}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restaurer
                </DropdownMenuItem>
            )}
        </>
    );
};

export default ActionUserDropdown;
