"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { deleteVariant } from "@/database/drizzle/repositories/variants";
import useModalState from "@/hooks/useModalState";
import { useQueryClient } from "@tanstack/react-query";

import React from "react";

const DeleteProperty = () => {
    const { payload, closeModal } = useModalState();

    const queryClient = useQueryClient();

    const handleConfirm = async () => {
        try {
            await deleteVariant([Number(payload.id)]);
            queryClient.invalidateQueries({ queryKey: ["LIST_IMMOBILIER_GESTION"] });
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
