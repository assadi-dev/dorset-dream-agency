import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import { wait } from "@/lib/utils";
import useModalState from "@/hooks/useModalState";
import { updateTransaction } from "@/database/drizzle/repositories/transactions";
import { ediTransaction } from "../../actions";
import { usePathname, useRouter } from "next/navigation";

const EditModal = () => {
    const { payload, closeModal } = useModalState();
    const router = useRouter();
    const pathname = usePathname();

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
        await ediTransaction(transactionID, values);
        closeModal();
        router.push(pathname);
    };

    return (
        <>
            {defaultValues && (
                <LocationVenteForm
                    className="w-full lg:w-[32vw] min-h-[420px]"
                    save={saveUpdateLocationVente}
                    defaultFormValues={defaultValues}
                />
            )}
        </>
    );
};

export default EditModal;
