import React from "react";
import ClientForm from "./ClientForm";
import { ClientFormType } from "./schema";

const AddForm = () => {
    const submitForm = (values: ClientFormType) => {
        console.log(values);
    };

    return <ClientForm save={submitForm} className="w-full lg:w-[25vw]" />;
};

export default AddForm;
