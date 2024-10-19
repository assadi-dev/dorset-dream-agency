import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { wait } from "@/lib/utils";
import useModalState from "@/hooks/useModalState";

const EditModal = () => {
    const { payload } = useModalState();

    const transactionID = payload.id;

    const defaultValues: unknown = {
        client: String(payload.clientID),
        employee: 8,
        property: String(payload.variantID),
        price: payload.price,
        keyQuantity: Number(payload.keyQuantity),
        keyNumber: String(payload.keyNumber),
        phone: payload.phone,
        price: payload.price,
        propertyService: payload.propertyService,
    };

    const saveUpdateLocationVente = async (values: LocationVentesFormType) => {
        await wait(1000);
        // await createTransaction(values);
        console.log(values);
    };

    return (
        <>
            {defaultValues && (
                <LocationVenteForm
                    className="w-full lg:w-[32vw] min-h-[420px]"
                    save={saveUpdateLocationVente}
                    defaultValues={defaultValues}
                />
            )}
        </>
    );
};

export default EditModal;
