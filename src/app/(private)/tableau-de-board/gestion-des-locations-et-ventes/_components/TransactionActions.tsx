import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import EditModal from "./forms/EditModal";
import DeleteTransaction from "./forms/DeleteTransaction";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { useSession } from "next-auth/react";
import { UserSession } from "@/auth";
import { Role } from "@/app/types/user";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { IterationCcw, Pen, Trash } from "lucide-react";
import ChangeStatusModal from "./forms/ChangeStatusModal";

type TransactionActionsProps = {
    payload: any;
};
const TransactionActions = ({ payload }: TransactionActionsProps) => {
    const { data } = useSession();
    const session = data as UserSession;
    const role = session?.user?.role as Role;
    const { openModal } = useModalState();
    const CAN_DELETE = ACTIONS_CONTROL_PERMISSION.isAdmin(role);

    const handleEdit = () => {
        openModal({
            title: "Modifier",
            component: EditModal,
            payload: payload,
        });
    };
    const handleDelete = () => {
        openModal({
            title: "Suppression",
            description: "Voulez-vous supprimez cette la transaction ?",
            component: DeleteTransaction,
            payload: { ids: [payload.id] },
        });
    };

    const handleChangeStatus = () => {
        openModal({
            title: "Mise à jour du statut",
            component: ChangeStatusModal,
            payload: payload,
        });
    };

    return (
        <div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleChangeStatus} className="text-blue-500">
                <IterationCcw className="mr-2 h-4 w-4" />
                Changer de status
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleEdit} className="text-primary">
                <Pen className="mr-2 h-4 w-4" />
                Modifier
            </DropdownMenuItem>

            {CAN_DELETE && (
                <DropdownMenuItem onClick={handleDelete} className="!text-red-600 hover:!bg-destructive/20">
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            )}
        </div>
    );
};

export default TransactionActions;
