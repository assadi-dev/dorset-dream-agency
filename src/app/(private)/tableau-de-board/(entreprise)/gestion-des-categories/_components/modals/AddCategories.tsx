"use client";
import { CategoryForm } from "../form/categoryForm";
import { useCategoriesMutation } from "../../_hooks/useCategoriesMutation";
import useModalState from "@/hooks/useModalState";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
export default function AddCategories() {
    const { create } = useCategoriesMutation();
    const { closeModal } = useModalState();

    const onSubmit = async (data: any) => {
        try {
            await create(data);
            closeModal();
            ToastSuccessSonner("Catégorie ajoutée avec succès");
        } catch (error) {
            ToastErrorSonner("Erreur lors de l'ajout de la catégorie");
        }
    }
    return (
        <div className="w-full sm:w-[22rem]" >
            <CategoryForm onSubmit={onSubmit} />
        </div>
    );
}