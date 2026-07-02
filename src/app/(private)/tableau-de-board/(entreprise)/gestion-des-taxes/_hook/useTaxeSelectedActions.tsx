"use client"

import { FORBIDDEN_ACTION } from "@/config/messages";
import { useTaxesMutation } from "./useTaxeMutation";
import { useSession } from "next-auth/react";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useModalState from "@/hooks/useModalState";
import DeleteTaxe from "../_components/modals/DeleteTaxe";
import { selectedLabel } from "@/lib/text";

type UseTaxeSelectedActionsProps = {
    selectedItems: any[];
    resetSelected: () => void;
};

export const useTaxeSelectedActions = ({ selectedItems, resetSelected }: UseTaxeSelectedActionsProps) => {

    const session = useSession();
    const { data } = session;
    const CAN_DELETE = ACTIONS_CONTROL_PERMISSION.isAdmin(data?.user?.role);
    const { openModal } = useModalState();

    const ids = selectedItems?.map((item) => item?.id);

    const handleClickDelete = () => {
        if (!CAN_DELETE) throw new Error(FORBIDDEN_ACTION);
        openModal({
            title: "Suppression des Taxes",
            description: selectedLabel(ids?.length),
            component: DeleteTaxe,
            payload: { ids, resetSelected },
        });
    };


    return {
        canDelete: CAN_DELETE,
        handleClickDelete,
    };
};