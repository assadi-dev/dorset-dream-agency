"use client";
import React from "react";
import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";

const EmployeesActions = ({ payload }) => {
    const { openModal } = useModalState();

    console.log(payload);

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un Employé`,
            description: `Modifier les  informations de ${payload.name}`,
            payload: payload,
            component: () => <div>C</div>,
        });
    };

    const handleClickDelete = () => {};

    return (
        <>
            <ActionColumnButton onEdit={handleClickEdit} onDelete={handleClickDelete} />
        </>
    );
};

export default EmployeesActions;
