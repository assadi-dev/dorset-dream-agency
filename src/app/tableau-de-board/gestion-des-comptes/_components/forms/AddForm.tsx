import React from "react";
import GestionAccountEmployeeForm from "./GestionAccountEmployeeForm";
import { GestionEmployeeFormType } from "./schema";

const AddForm = () => {
    const createAccount = async (values: GestionEmployeeFormType) => {
        console.log("values", values);
    };

    return <GestionAccountEmployeeForm className="w-full lg:w-[32vw] min-h-[420px]" save={createAccount} />;
};

export default AddForm;
