"use client";
import AddButton from "@/components/forms/AddButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import AddForm from "./forms/AddForm";
import useGetRoleUser from "@/hooks/useRoleUser";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { FORBIDDEN_ACTION } from "@/config/messages";

const GestionCompteRightAction = () => {
    const { toggleModal } = useModalState();
    const role = useGetRoleUser();

    const handleClickAddBtn = () => {
        if (!ACTIONS_CONTROL_PERMISSION.canAction(role)) throw new Error(FORBIDDEN_ACTION);
        toggleModal({
            title: "Créer un compte employé",
            description: "Création de compte et information de l'employé",
            component: AddForm,
        });
    };

    return (
        <div className="flex justify-end items-center">
            {ACTIONS_CONTROL_PERMISSION.canAction(role) && <AddButton onClick={handleClickAddBtn} />}
        </div>
    );
};

export default GestionCompteRightAction;
