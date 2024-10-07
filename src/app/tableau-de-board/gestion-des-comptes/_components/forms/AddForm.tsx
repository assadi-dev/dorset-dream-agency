import React from "react";
import GestionAccountEmployeeForm from "./GestionAccountEmployeeForm";
import { GestionEmployeeFormType } from "./schema";
import { insertEmployee, insertUserAccount } from "../../action";
import { usePathname, useRouter } from "next/navigation";

const AddForm = () => {
    const pathname = usePathname();
    const router = useRouter();

    const createAccount = async (values: GestionEmployeeFormType) => {
        const newUserId = await insertUserAccount(values);
        values.userID = newUserId;
        await insertEmployee(values);
        router.refresh();
        router.push(pathname);
    };

    return <GestionAccountEmployeeForm className="w-full lg:w-[32vw] min-h-[420px]" save={createAccount} />;
};

export default AddForm;
