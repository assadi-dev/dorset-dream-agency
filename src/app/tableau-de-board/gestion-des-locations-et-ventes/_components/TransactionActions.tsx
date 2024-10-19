import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import EditModal from "./forms/EditModal";

const TransactionActions = ({ payload }) => {
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
            component: EditModal,
            payload: payload,
        });
    };

    return <ActionColumnButton onEdit={handleEdit} onDelete={handleDelete} />;
};

export default TransactionActions;
