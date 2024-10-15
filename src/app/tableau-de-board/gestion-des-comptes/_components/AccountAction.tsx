import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import React from "react";
import EditForm from "./forms/EditForm";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";

const AccountAction = ({ payload }) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un compte`,
            description: `Compte crée le ${formatFullDateShortTextWitHours(payload.createdAt)}`,
            payload: payload,
            component: EditForm,
        });
    };
    const handleClickDelete = () => {};

    return <ActionColumnButton onEdit={handleClickEdit} onDelete={handleClickDelete} />;
};

export default AccountAction;
