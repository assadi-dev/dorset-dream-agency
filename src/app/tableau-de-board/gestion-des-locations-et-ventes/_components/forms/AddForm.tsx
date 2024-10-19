import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { wait } from "@/lib/utils";

const AddForm = () => {
    const creteLocationVente = async (values: LocationVentesFormType) => {
        wait(3000);
        console.log(values);
    };

    return <LocationVenteForm className="w-full lg:w-[32vw] min-h-[420px]" save={creteLocationVente} />;
};

export default AddForm;
