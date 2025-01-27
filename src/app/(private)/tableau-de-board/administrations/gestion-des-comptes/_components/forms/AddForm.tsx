import React from "react";
import GestionAccountEmployeeForm from "./GestionAccountEmployeeForm";
import { GestionEmployeeFormType } from "./schema";
import { usePathname, useRouter } from "next/navigation";
import { createAccount } from "../../action";

const AddForm = () => {
    const pathname = usePathname();
    const router = useRouter();

    const submitCreateAccount = async (
        values: GestionEmployeeFormType & {
            userID?: any;
        },
    ) => {
        await createAccount(values);

        router.push(pathname);
        router.refresh();
    };

    return <GestionAccountEmployeeForm className="w-full lg:w-[32vw] min-h-[420px]" save={submitCreateAccount} />;
};

export default AddForm;
