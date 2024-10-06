"use client";
import AddButton from "@/components/forms/AddButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import AddForm from "./forms/AddForm";

const GestionCompteRightAction = () => {
    const { toggleModal } = useModalState();

    const handleClickAddBtn = () => {
        toggleModal({
            title: "Créer un compte employé",
            description: "Création de compte et information de l'employé",
            component: AddForm,
        });
    };

    return (
        <div className="flex justify-end items-center">
            <AddButton onClick={handleClickAddBtn} />
        </div>
    );
};

export default GestionCompteRightAction;
