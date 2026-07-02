"use client"

import { TaxeInputsType } from "@/database/drizzle/repositories/dto/taxesDTO";
import TaxesForm from "../form/taxesForm";
import { useTaxesMutation } from "../../_hook/useTaxeMutation";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import useModalState from "@/hooks/useModalState";




export default function AddTaxes() {
    const { create } = useTaxesMutation();
    const { closeModal } = useModalState();

    const onSubmit = async (data: TaxeInputsType) => {
        try {
            await create(data);
            ToastSuccessSonner("Taxe ajoutée avec succès");
            closeModal();

        } catch (error) {
            ToastErrorSonner("Erreur lors de l'ajout de la taxe");
        }
    }
    return (
        <div className="w-full sm:w-[32vw]">
            <TaxesForm onSubmit={onSubmit} />
        </div>
    );
}
