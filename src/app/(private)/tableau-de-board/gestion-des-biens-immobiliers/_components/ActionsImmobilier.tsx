import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";
import { Pen, Trash, ImagePlus, Copy } from "lucide-react";
import DeleteProperty from "./forms/DeleteProperty";
import AddVariantProperty from "./forms/AddVariantProperty";
import EditFormProperty from "./forms/EditFormProperty";
import Link from "next/link";

type ActionsImmobilierProps = {
    payload: any;
};
const ActionsImmobilier = ({ payload }: ActionsImmobilierProps) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un biens Immobilier`,
            description: `Crée le ${payload ? formatFullDateShortTextWitHours(payload?.createdAt) : "Date non résigné"}`,
            payload: payload,
            component: EditFormProperty,
        });
    };
    const handleClickNewVariant = () => {
        openModal({
            title: `Ajouter une variante`,
            description: `Ajouté un ou plusieurs variante pour `,
            payload: payload,
            component: AddVariantProperty,
        });
    };
    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un biens Immobilier`,
            description: `${payload.name}`,
            payload: { ids: [payload.id] },
            component: DeleteProperty,
        });
    };
    const handleClickDuplicate = () => {};

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickNewVariant} className="text-primary">
                <ImagePlus className="mr-2 h-4 w-4" /> Ajouter une variante
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-primary">
                <Link href={`/tableau-de-board/gestion-des-biens-immobiliers/modifier?property=${payload.id}`}>
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-primary" onClick={handleClickDuplicate} disabled>
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer (Bientôt disponnible)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClickDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
            </DropdownMenuItem>
        </>
    );
};

export default ActionsImmobilier;
