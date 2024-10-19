"use client";
import React from "react";
import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";
import EditForm from "./forms/EditForm";

const EmployeesActions = ({ payload }) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un Employé`,
            description: `Modifier les  informations de ${payload.name}`,
            payload: payload,
            component: () => <EditForm />,
        });
    };

    const handleClickDelete = () => {
        console.log(payload);

        // removeTransaction
    };

    return (
        <>
            <ActionColumnButton onEdit={handleClickEdit} onDelete={handleClickDelete} />
        </>
    );
};

export default EmployeesActions;
