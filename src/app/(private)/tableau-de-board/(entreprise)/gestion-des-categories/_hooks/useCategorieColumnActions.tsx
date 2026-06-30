"use client"

import useModalState from "@/hooks/useModalState";
import { Category } from "../_components/table/columns";
import UpdateCategories from "../_components/modals/UpdateCategories";
import DeleteCategoryView from "../_components/modals/DeleteCategoryView";
import { ActionPermission } from "@/app/types/user";

export const useCategorieColumnActions = (payload: Category, permission: ActionPermission) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: `Modifier une catégorie`,
            description: `Modifier les  informations de ${payload.name}`,
            payload: payload,
            component: UpdateCategories,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: `Supprimer une catégorie`,
            description: `Supprimer les informations de ${payload.name}`,
            component: DeleteCategoryView,
            payload: { ids: [payload.id] },
        });
    };

    return {
        handleClickEdit,
        handleClickDelete
    }

}