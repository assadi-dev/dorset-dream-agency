"use client";
import React from "react";
import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";
import EditForm from "./forms/EditForm";
import DeleteForm from "./forms/DeleteForm";
import useGetRoleUser from "@/hooks/useRoleUser";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";

type EmployeesActionsProps = {
    payload: any;
};
const EmployeesActions = ({ payload }: EmployeesActionsProps) => {
    const { openModal } = useModalState();
    const role = useGetRoleUser();
    const handleClickEdit = () => {
        openModal({
            title: `Modifier un Employé`,
            description: `Modifier les  informations de ${payload.name}`,
            payload: payload,
            component: () => <EditForm />,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un Employé`,
            description: `Supprimer les informations de ${payload.name}`,
            component: DeleteForm,
            payload: payload,
        });
    };

    return (
        <>
            <ActionColumnButton
                onEdit={handleClickEdit}
                onDelete={handleClickDelete}
                canDelete={ACTIONS_CONTROL_PERMISSION.isAdmin(role)}
                canUpdate={true}
            />
        </>
    );
};

export default EmployeesActions;
