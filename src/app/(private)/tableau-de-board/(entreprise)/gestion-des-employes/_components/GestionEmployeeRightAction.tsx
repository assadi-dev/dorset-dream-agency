"use client";
import AddButton from "@/components/forms/AddButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import AddForm from "./forms/AddForm";
import { useSession } from "next-auth/react";
import { canAction } from "@/lib/utils";

const GestionEmployeeRightAction = () => {
    const { toggleModal } = useModalState();
    const session = useSession();
    const role = session.data?.user?.role;
    const canAdd = canAction(role);
    const handleClickAddBtn = () => {
        toggleModal({
            title: "Ajouter un employé",
            description: "Ajouter un compte et information d'un employé",
            component: AddForm,
        });
    };

    return <div className="flex justify-end items-center">{canAdd && <AddButton onClick={handleClickAddBtn} />}</div>;
};

export default GestionEmployeeRightAction;
