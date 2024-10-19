import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { wait } from "@/lib/utils";
import { createTransaction } from "../../actions";
import { usePathname, useRouter } from "next/navigation";

const AddForm = () => {
    const router = useRouter();
    const pathname = usePathname();
    const creteLocationVente = async (values: LocationVentesFormType) => {
        await createTransaction(values);
        router.push(pathname);
    };

    return (
        <LocationVenteForm
            className="w-full lg:w-[32vw] min-h-[420px]"
            defaultFormValues={{ employee: 8 }}
            save={creteLocationVente}
        />
    );
};

export default AddForm;
