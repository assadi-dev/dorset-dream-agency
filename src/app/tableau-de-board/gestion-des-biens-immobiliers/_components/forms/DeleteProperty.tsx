"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { deleteVariant } from "@/database/drizzle/repositories/variants";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

const DeleteProperty = () => {
    const { payload, closeModal } = useModalState();
    const pathname = usePathname();
    const router = useRouter();

    const handleConfirm = async () => {
        try {
            await deleteVariant([payload.id]);
            ToastSuccessSonner(`la propriété ${payload.name} a été supprimé avec succès`);
            closeModal();
            router.push(pathname);
            router.refresh();
        } catch (error: any) {
            ToastErrorSonner(`La suppression n'a pas pu être effectué raison: ${error.message}`);
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
                className="flex justify-end gap-3 lg:w-[25vw]"
            />
        </div>
    );
};

export default DeleteProperty;
