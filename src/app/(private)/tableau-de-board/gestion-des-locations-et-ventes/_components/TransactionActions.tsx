import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import EditModal from "./forms/EditModal";
import DeleteTransaction from "./forms/DeleteTransaction";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { useSession } from "next-auth/react";
import { UserSession } from "@/auth";
import { Role } from "@/app/types/user";

type TransactionActionsProps = {
    payload: any;
};
const TransactionActions = ({ payload }: TransactionActionsProps) => {
    const { data } = useSession();
    const session = data as UserSession;
    const role = session?.user?.role as Role;
    const { openModal } = useModalState();

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
            payload: payload,
        });
    };

    return (
        <ActionColumnButton
            onEdit={handleEdit}
            onDelete={handleDelete}
            canUpdate={true}
            canDelete={ACTIONS_CONTROL_PERMISSION.isAdmin(role)}
        />
    );
};

export default TransactionActions;
