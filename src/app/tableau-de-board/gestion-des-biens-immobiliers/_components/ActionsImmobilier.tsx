import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";
import { Pen, Trash, ImagePlus } from "lucide-react";

const ActionsImmobilier = ({ payload }) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un biens Immobilier`,
            description: `Crée le ${formatFullDateShortTextWitHours(payload.createdAt)}`,
            payload: payload,
        });
    };
    const handleClickNewVariant = () => {
        openModal({
            title: `Ajouter une variante`,
            description: `Ajouté un ou plusieurs variante pour `,
            payload: payload,
        });
    };
    const handleClickDelete = () => {};

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickNewVariant} className="text-primary">
                <ImagePlus className="mr-2 h-4 w-4" /> Ajouter une variante
            </DropdownMenuItem>
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

export default ActionsImmobilier;