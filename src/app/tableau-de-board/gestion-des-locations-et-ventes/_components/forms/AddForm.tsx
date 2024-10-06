import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";

const AddForm = () => {
    const creteLocationVente = async (values: LocationVentesFormType) => {};

    return <LocationVenteForm className="w-full lg:w-[32vw] min-h-[420px]" save={creteLocationVente} />;
};

export default AddForm;
