"use client";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";

import useModalState from "@/hooks/useModalState";
import TaxesForm from "../form/taxesForm";
import { TaxeInputsType } from "@/database/drizzle/repositories/dto/taxesDTO";
import { TaxeColumnData } from "../table/columns";
import { useTaxesMutation } from "../../_hook/useTaxeMutation";

export default function UpdateTaxes() {
    const { update } = useTaxesMutation();
    const { closeModal, payload } = useModalState();

    const entries = payload as TaxeColumnData


    const saveCategory = async (data: TaxeInputsType) => {

        try {
            await update({ id: entries.id, data });
            ToastSuccessSonner("Catégorie modifiée avec succès");
            closeModal();
        } catch (error) {
            ToastErrorSonner("Erreur lors de la modification de la catégorie");
        }
    }


    const defaultValues = {
        name: entries?.name || "",
        rate: entries?.rate || 0,
        description: entries?.description || "",
    } satisfies TaxeInputsType;

    return (
        <div className="w-full sm:w-[32rem]" >
            <TaxesForm onSubmit={saveCategory} defaultValues={defaultValues} />
        </div>
    );
}