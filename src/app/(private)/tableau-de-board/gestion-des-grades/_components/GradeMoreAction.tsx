"use client";
import useModalState from "@/hooks/useModalState";
import { formatFullDateShortTextWitHours } from "@/lib/date";
import { ActionControl } from "@/types/global";
import EditForm from "./forms/EditForm";
import DeleteGrade from "./forms/DeleteGrade";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Pen, Trash } from "lucide-react";

type GradeMoreActionProps = ActionControl & {
    payload: any;
};
const GradeMoreAction = ({ payload, canUpdate, canDelete }: GradeMoreActionProps) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un grade`,
            description: `Grade crée le ${formatFullDateShortTextWitHours(payload.createdAt)}`,
            payload: payload,
            component: EditForm,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un grade`,
            description: `Supprimer le grade ${payload.name}`,
            payload: { ids: [payload.id] },
            component: DeleteGrade,
        });
    };

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {canUpdate && (
                <DropdownMenuItem onClick={handleClickEdit} className="text-primary">
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </DropdownMenuItem>
            )}
            {canDelete && (
                <DropdownMenuItem onClick={handleClickDelete} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            )}
        </>
    );
};

export default GradeMoreAction;
