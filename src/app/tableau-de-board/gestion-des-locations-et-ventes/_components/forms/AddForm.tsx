import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { createTransaction } from "../../actions";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddForm = () => {
    const { data } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const creteLocationVente = async (values: LocationVentesFormType) => {
        await createTransaction(values);
        router.push(pathname);
    };
    const employee = data?.user?.employeeID;

    return (
        <>
            {employee && (
                <LocationVenteForm
                    className="w-full lg:w-[32vw] min-h-[420px]"
                    defaultFormValues={{ employee }}
                    save={creteLocationVente}
                />
            )}
        </>
    );
};

export default AddForm;
