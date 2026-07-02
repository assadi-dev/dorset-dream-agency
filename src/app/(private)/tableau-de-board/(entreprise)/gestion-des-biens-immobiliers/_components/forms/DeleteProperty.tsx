"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import { useQueryClient } from "@tanstack/react-query";

import React from "react";
import { removePropertiesAction } from "../../actions";

const DeleteProperty = () => {
    const { payload, closeModal } = useModalState();

    const queryClient = useQueryClient();

    const handleConfirm = async () => {
        try {
            const formData = new FormData();
            const ids = payload.ids as number[];

            ids.forEach((id) => formData.append("ids", String(id)));
            await removePropertiesAction(formData);
            queryClient.refetchQueries({ queryKey: ["LIST_IMMOBILIER_GESTION"] });
            payload?.resetSelected && payload?.resetSelected();
            closeModal();
        } catch (error: any) {
            throw error;
        }
    };

    const handleCancel = async () => {
        closeModal();
    };

    return (
        <AlertModalContent
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            successMessage={`la propriété ${payload.name} a été supprimé avec succès`}
            className="flex justify-end gap-3 lg:w-[25vw]"
        />
    );
};

export default DeleteProperty;
