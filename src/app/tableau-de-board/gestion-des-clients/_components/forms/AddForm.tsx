import React from "react";
import ClientForm from "./ClientForm";
import { ClientFormType } from "./schema";
import { wait } from "@/lib/utils";

const AddForm = () => {
    const submitForm = async (values: ClientFormType) => {
        await wait(3000);
        console.log(values);
    };

    return <ClientForm save={submitForm} className="w-full lg:w-[28vw] min-h-[420px]" />;
};

export default AddForm;
