"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { duplicateVarianteApi } from "../../helpers";
import { useRouter } from "next/navigation";

const DuplicateProperty = () => {
    const { payload, closeModal } = useModalState();
    const router = useRouter();

    payload as unknown as { id: number; name: string };

    const queryClient = useQueryClient();

    const handleConfirm = async () => {
        try {
            queryClient.refetchQueries({ queryKey: ["LIST_IMMOBILIER_GESTION"] });
            const result = await duplicateVarianteApi({
                id: payload.id,
                name: payload.name,
            });
            closeModal();
            router.push(`/tableau-de-board/gestion-des-biens-immobiliers/modifier?property=${result.id}`);
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
            successMessage={`la propriété ${payload.name} a été dupliqué avec succès`}
            className="flex justify-end gap-3 lg:w-[25vw]"
        />
    );
};

export default DuplicateProperty;
