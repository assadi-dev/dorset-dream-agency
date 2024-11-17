import React from "react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Pen, Trash, LockKeyhole, Eye, GalleryThumbnails, Images } from "lucide-react";
import useModalState from "@/hooks/useModalState";
import EditWarrant from "../views/EditWarrant";
import DeleteWarrant from "../views/DeleteWarrant";

type WarrantActionsProps = {
    payload: any;
};
const WarrantActions = ({ payload }: WarrantActionsProps) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier les mandats de ${payload.client}`,
            component: EditWarrant,
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
            <DropdownMenuItem onClick={handleClickEdit} className="text-primary">
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
