"use client";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { CategoryForm } from "../form/categoryForm";
import { useCategoriesMutation } from "../../_hooks/useCategoriesMutation";
import useModalState from "@/hooks/useModalState";

export default function UpdateCategories() {
    const { update } = useCategoriesMutation();
    const { closeModal, payload } = useModalState();


    const saveCategory = async (data: any) => {

        try {
            await update({ id: entries.id, body: data });
            ToastSuccessSonner("Catégorie modifiée avec succès");
            closeModal();
        } catch (error) {
            ToastErrorSonner("Erreur lors de la modification de la catégorie");
        }
    }

    const entries = payload as { name: string, id: number }

    const defaultValues = {
        name: entries?.name || "",
    }

    return (
        <div className="w-full sm:w-[22rem]" >
            <CategoryForm onSubmit={saveCategory} defaultValues={defaultValues} />
        </div>
    );
}