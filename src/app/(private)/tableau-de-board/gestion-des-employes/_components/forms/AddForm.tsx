import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GestionEmployeeFormType } from "../../../administrations/gestion-des-comptes/_components/forms/schema";
import GestionAccountEmployeeForm from "../../../administrations/gestion-des-comptes/_components/forms/GestionAccountEmployeeForm";
import { insertUserAccount } from "@/database/drizzle/repositories/users";
import { insertEmployee } from "@/database/drizzle/repositories/employee";

const AddForm = () => {
    const pathname = usePathname();
    const router = useRouter();

    const createAccount = async (
        values: GestionEmployeeFormType & {
            userID?: any;
        },
    ) => {
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
