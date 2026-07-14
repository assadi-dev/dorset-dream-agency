"use client"

import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner"
import { DragEndEvent } from "@dnd-kit/react"
import { Category } from "../_components/table/columns";


export default function useReorderCategories() {

    const saveReorderCategories = (event: DragEndEvent) => {
        try {
            if (event.canceled) return;

            if (event.canceled) return;

            const { source, target } = event.operation;
            const data = source?.data as Category;
            if (!data) return;
            const { initialIndex, index } = source as any;

            if (initialIndex === index) return;
            const targetIndex = index as number;

            const payload = {
                id: data.id,
                name: data.name,
                oldPosition: initialIndex,
                newPosition: targetIndex,
            }

            console.log(payload);



            ToastSuccessSonner(`La nouvelle position de la catégorie ${data.name} a été enregistrée avec succès`)

        } catch (error) {

            ToastErrorSonner("Erreur lors de l'enregistrement de la nouvelle position de la catégorie")

        }

    }

    return {
        saveReorderCategories
    }

}