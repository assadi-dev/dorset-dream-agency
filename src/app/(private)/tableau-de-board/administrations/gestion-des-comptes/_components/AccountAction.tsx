import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import React from "react";
import EditForm from "./forms/EditForm";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";
import NewPassword from "./forms/NewPassword";
import { Pen, Trash, LockKeyhole } from "lucide-react";
import DeleteAccount from "./forms/DeleteAccount";
import { ActionControl } from "@/types/global";

type AccountActionProps = ActionControl & {
    payload: any;
};
const AccountAction = ({ payload, canUpdate, canDelete, canChangePassword }: AccountActionProps) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un compte`,
            description: `Compte crée le ${formatFullDateShortTextWitHours(payload.createdAt)}`,
            payload: payload,
            component: EditForm,
        });
    };
    const handleClickNewPassword = () => {
        openModal({
            title: `Nouveau mot de passe`,
            description: `Nouveau mot de passee pour le compte ${payload.username}`,
            payload: payload,
            component: NewPassword,
        });
    };
    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un compte`,
            description: `Supprimer le compte ${payload.username}`,
            payload: { ids: [payload.id] },
            component: DeleteAccount,
        });
    };

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {canChangePassword && (
                <DropdownMenuItem onClick={handleClickNewPassword} className="text-primary">
                    <LockKeyhole className="mr-2 h-4 w-4" /> Nouveau mot de passe
                </DropdownMenuItem>
            )}
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

export default AccountAction;
