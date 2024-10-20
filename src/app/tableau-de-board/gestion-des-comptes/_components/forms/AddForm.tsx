import React from "react";
import GestionAccountEmployeeForm from "./GestionAccountEmployeeForm";
import { GestionEmployeeFormType } from "./schema";

import { usePathname, useRouter } from "next/navigation";
import { insertUserAccount } from "@/database/drizzle/repositories/users";
import { insertEmployee } from "@/database/drizzle/repositories/employee";

const AddForm = () => {
    const pathname = usePathname();
    const router = useRouter();

    const createAccount = async (values: GestionEmployeeFormType) => {
        const newUserId = await insertUserAccount(values);
        values.userID = newUserId;
        const secteursIds = values.secteur.map((secteur) => Number(secteur.value));
        await insertEmployee({ ...values, secteursIds });

        router.push(pathname);
        router.refresh();
    };

    return <GestionAccountEmployeeForm className="w-full lg:w-[32vw] min-h-[420px]" save={createAccount} />;
};

export default AddForm;
