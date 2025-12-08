"use client";
import useModalState from "@/hooks/useModalState";
import { formatFullDateShortTextWitHours } from "@/lib/date";
import { ActionControl } from "@/types/global";
import EditForm from "./forms/EditForm";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Pen, Trash } from "lucide-react";
import DeleteRole from "./forms/DeleteRole";

type RoleMoreActionProps = ActionControl & {
    payload: any;
};
const RoleMoreAction = ({ payload, canUpdate, canDelete }: RoleMoreActionProps) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un rôle`,
            description: `Rôle crée le ${formatFullDateShortTextWitHours(payload.createdAt)}`,
            payload: payload,
            component: EditForm,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un rôle`,
            description: `Supprimer le rôle ${payload.name}`,
            payload: { ids: [payload.id] },
            component: DeleteRole,
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

export default RoleMoreAction;
