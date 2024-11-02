"use client";
import useModalState from "@/hooks/useModalState";
import React from "react";
import AddForm from "./forms/AddForm";
import AddButton from "@/components/forms/AddButton";

const ClientPageRightAction = () => {
    const { toggleModal } = useModalState();

    const handleClickAddBtn = () => {
        toggleModal({ title: "Ajouter un client", component: AddForm });
    };

    return (
        <div className="flex justify-end items-center">
            <AddButton onClick={handleClickAddBtn} />
        </div>
    );
};

export default ClientPageRightAction;
