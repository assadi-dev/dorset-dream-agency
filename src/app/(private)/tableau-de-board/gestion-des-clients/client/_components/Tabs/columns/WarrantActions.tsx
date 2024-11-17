import React from "react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Trash, Images } from "lucide-react";
import useModalState from "@/hooks/useModalState";
import DeleteWarrant from "../views/DeleteWarrant";
import ShowPerquisitionPhotos from "../views/ShowPerquisitionPhotos";

type WarrantActionsProps = {
    payload: any;
};
const WarrantActions = ({ payload }: WarrantActionsProps) => {
    const { openModal } = useModalState();

    const handleClickShowPerquisition = () => {
        openModal({
            title: `Voir les mandats de ${payload.client}`,
            component: ShowPerquisitionPhotos,
            payload,
        });
    };
    const handleClickDelete = () => {
        openModal({
            title: "Supprimer les mandats",
            description: `Mandat ID: ${payload.id}`,
            component: DeleteWarrant,
            payload,
        });
    };

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickShowPerquisition} className="text-primary">
                <Images className="mr-2 h-4 w-4" />
                Voir les mandats
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClickDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
            </DropdownMenuItem>
        </>
    );
};

export default WarrantActions;
