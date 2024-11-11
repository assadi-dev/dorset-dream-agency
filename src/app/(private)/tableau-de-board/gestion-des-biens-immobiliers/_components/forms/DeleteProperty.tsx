"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { removeProperty, removePropertyWithFiles } from "@/database/drizzle/repositories/properties";
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
            formData.append("ids", payload.id);
            await removePropertiesAction(formData);
            queryClient.refetchQueries({ queryKey: ["LIST_IMMOBILIER_GESTION"] });
            closeModal();
        } catch (error: any) {
            throw error;
        }
    };

    const handleCancel = async () => {
        closeModal();
    };

    return (
        <div>
            <AlertModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                successMessage={`la propriété ${payload.name} a été supprimé avec succès`}
                className="flex justify-end gap-3 lg:w-[25vw]"
            />
        </div>
    );
};

export default DeleteProperty;
