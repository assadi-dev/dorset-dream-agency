import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { wait } from "@/lib/utils";
import { createTransaction } from "../../actions";

const AddForm = () => {
    const creteLocationVente = async (values: LocationVentesFormType) => {
        await wait(1000);
        await createTransaction(values);
    };

    return <LocationVenteForm className="w-full lg:w-[32vw] min-h-[420px]" save={creteLocationVente} />;
};

export default AddForm;
