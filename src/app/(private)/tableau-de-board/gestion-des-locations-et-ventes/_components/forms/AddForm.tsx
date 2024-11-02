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

        await createTransaction(formData);
        router.push(pathname);
        router.refresh();
    };

    const userData = data?.user as UserCredential | undefined;

    return (
        <>
            {userData?.employeeID && (
                <LocationVenteForm
                    className="w-full lg:w-[32vw] min-h-[420px]"
                    defaultFormValues={{ employee: userData.employeeID }}
                    save={creteLocationVente}
                />
            )}
        </>
    );
};

export default AddForm;
