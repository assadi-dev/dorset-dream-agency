import React from "react";
import ClientForm from "./ClientForm";
import { ClientFormType } from "./schema";
import { insertClient } from "../../actions";

const AddForm = () => {
    const createClient = async (values: ClientFormType) => {
        await insertClient(values);
    };

    return <ClientForm save={createClient} className="w-full lg:w-[28vw] min-h-[420px]" />;
};

export default AddForm;
