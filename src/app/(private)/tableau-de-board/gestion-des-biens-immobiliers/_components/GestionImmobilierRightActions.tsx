import AddButton from "@/components/forms/AddButton";
import { PAGES } from "@/config/pages";
import React from "react";

const GestionImmobilierRightActions = () => {
    return (
        <div className="flex justify-end">
            <AddButton href={PAGES.ADD_PROPERTY} />
        </div>
    );
};

export default GestionImmobilierRightActions;
