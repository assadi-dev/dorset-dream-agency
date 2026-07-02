import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GestionEmployeeFormType } from "../../../../administrations/gestion-des-comptes/_components/forms/schema";
import GestionAccountEmployeeForm from "../../../../administrations/gestion-des-comptes/_components/forms/GestionAccountEmployeeForm";
import { createEmployee } from "../../actions";

const AddForm = () => {
    const pathname = usePathname();
    const router = useRouter();

    const createAccount = async (
        values: GestionEmployeeFormType & {
            userID?: any;
        },
    ) => {
        await createEmployee(values);

    };

    return <GestionAccountEmployeeForm className="w-full lg:w-[32vw] min-h-[420px]" save={createAccount} />;
};

export default AddForm;
