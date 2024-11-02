import AddButton from "@/components/forms/AddButton";
import useModalState from "@/hooks/useModalState";
import React from "react";
import AddForm from "./forms/AddForm";

const GestionEmployeeRightAction = () => {
    const { toggleModal } = useModalState();

    const handleClickAddBtn = () => {
        toggleModal({
            title: "Ajouter un employé",
            description: "Ajouter un compte et information d'un employé",
            component: AddForm,
        });
    };

    return (
        <div className="flex justify-end items-center">
            <AddButton onClick={handleClickAddBtn} />
        </div>
    );
};

export default GestionEmployeeRightAction;
