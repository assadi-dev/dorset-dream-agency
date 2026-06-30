"use client"

import { FORBIDDEN_ACTION } from "@/config/messages";
import { useSession } from "next-auth/react";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useModalState from "@/hooks/useModalState";
import { selectedLabel } from "@/lib/text";
import DeleteCategoryView from "../_components/modals/DeleteCategoryView";

type UseCategoriesSelectedActionsProps = {
    selectedItems: any[];
    resetSelected: () => void;
};

export const useCategoriesSelectedActions = ({ selectedItems, resetSelected }: UseCategoriesSelectedActionsProps) => {

    const session = useSession();
    const { data } = session;
    const CAN_DELETE = ACTIONS_CONTROL_PERMISSION.isAdmin(data?.user?.role);
    const { openModal } = useModalState();

    const ids = selectedItems?.map((item) => item?.id);

    const handleClickDelete = () => {
        if (!CAN_DELETE) throw new Error(FORBIDDEN_ACTION);
        openModal({
            title: "Suppression des Categories",
            description: selectedLabel(ids?.length),
            component: DeleteCategoryView,
            payload: { ids, resetSelected },
        });
    };


    return {
        canDelete: CAN_DELETE,
        handleClickDelete,
    };
};