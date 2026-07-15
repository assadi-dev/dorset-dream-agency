"use client"

import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner"
import { DragEndEvent } from "@dnd-kit/react"
import { Category } from "../_components/table/columns";
import { useCategoriesMutation } from "./useCategoriesMutation";
import { createPayloadReorder } from "../_components/table/helper";


export default function useReorderCategories() {
    const { reorder } = useCategoriesMutation();

    const saveReorderCategories = async (event: DragEndEvent) => {
        try {
            if (event.canceled) return;

            const payload = createPayloadReorder(event)
            if (!payload) return;
            await reorder(payload);

            ToastSuccessSonner(`La nouvelle position de la catégorie ${payload.name} a été enregistrée avec succès`)

        } catch (error) {

            ToastErrorSonner("Erreur lors de l'enregistrement de la nouvelle position de la catégorie")

        }

    }

    return {
        saveReorderCategories
    }

}