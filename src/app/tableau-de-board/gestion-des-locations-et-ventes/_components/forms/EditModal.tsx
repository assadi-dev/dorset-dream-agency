import React from "react";
import LocationVenteForm from "./LocationVenteForm";
import { LocationVentesFormType } from "./schema";
import useModalState from "@/hooks/useModalState";
import { ediTransaction } from "../../actions";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { UserCredential } from "@/app/types";

const EditModal = () => {
    const { payload, closeModal } = useModalState();
    const router = useRouter();
    const pathname = usePathname();
    const { data } = useSession();

    const transactionID = payload.id;

    const userData = data?.user as UserCredential;

    const employee = userData?.employeeID;

    const defaultValues = {
        client: String(payload.clientID),
        employee,
        property: String(payload.variantID),
        price: payload.price,
        keyQuantity: Number(payload.keyQuantity),
        keyNumber: String(payload.keyNumber),
        phone: payload.phone,
        propertyService: payload.propertyService,
    } satisfies LocationVentesFormType;

    const saveUpdateLocationVente = async (values: LocationVentesFormType) => {
        await ediTransaction(transactionID, values);
        closeModal();
        router.push(pathname);
        router.refresh();
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
