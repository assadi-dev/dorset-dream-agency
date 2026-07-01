import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { createTransaction } from "../../actions";
import { usePathname, useRouter } from "next/navigation";
import { SessionContextValue, useSession } from "next-auth/react";
import { User } from "next-auth";
import { UserCredential } from "@/app/types";

const AddForm = () => {
    const { data }: SessionContextValue = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const creteLocationVente = async (values: LocationVentesFormType) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            if (value) formData.append(key, value as any);
        }

        formData.append("unitPrice", values.price.toString());
        if (values.taxes) {
            values.taxes.forEach((tax) => {
                if (tax.id !== "none") {
                    formData.append("taxes", JSON.stringify(tax));
                }
            });
        }
        await createTransaction(formData);
        router.push(pathname);
        router.refresh();
    };

    const userData = data?.user as UserCredential | undefined;

    return (
        <>
            {userData?.employeeID && (
                <LocationVenteForm
                    className="w-full sm:w-[580px] xl:w-[42vw] min-h-[420px]"
                    defaultFormValues={{ employee: userData.employeeID }}
                    save={creteLocationVente}
                />
            )}
        </>
    );
};

export default AddForm;
