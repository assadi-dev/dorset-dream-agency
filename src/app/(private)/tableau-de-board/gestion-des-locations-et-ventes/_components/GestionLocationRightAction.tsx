"use client";
import AddButton from "@/components/forms/AddButton";
import React from "react";
import AddForm from "./forms/AddForm";
import useModalState from "@/hooks/useModalState";

const GestionLocationRightAction = () => {
    const { toggleModal } = useModalState();

    const handleClickAddBtn = () => {
        toggleModal({
            title: "Location - Ventes",
            description: "Ajouter une location ou un achat",
            component: AddForm,
        });
    };

    return (
        <div className="flex justify-end items-center">
            <AddButton onClick={handleClickAddBtn} />
        </div>
    );
};

export default GestionLocationRightAction;
