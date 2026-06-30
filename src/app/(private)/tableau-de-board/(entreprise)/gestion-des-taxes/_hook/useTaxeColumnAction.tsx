"use client"


import { ActionPermission } from "@/app/types/user";
import useModalState from "@/hooks/useModalState";
import { TaxeColumnData } from "../_components/table/columns";
import UpdateTaxes from "../_components/modals/UpdateTaxes";
import DeleteTaxe from "../_components/modals/DeleteTaxe";


export const useTaxeColumnAction = (payload: TaxeColumnData) => {
    const { openModal } = useModalState();

    const handleEdit = () => {
        openModal({
            title: `Modifier une taxe`,
            description: `Modifier les  informations de ${payload.name}`,
            payload: payload,
            component: UpdateTaxes,
        });
    };

    const handleDelete = () => {
        openModal({
            title: `Supprimer une taxe`,
            description: `Supprimer la taxe ${payload.name}`,
            component: DeleteTaxe,
            payload: { ids: [payload.id] },
        });
    };

    return {
        handleEdit,
        handleDelete,
    };
}