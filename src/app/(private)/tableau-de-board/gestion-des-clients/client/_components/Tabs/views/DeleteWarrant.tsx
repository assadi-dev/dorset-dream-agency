"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { ToastSuccessSonner } from "@/components/notify/Sonner";
import { deletesPerquisitions } from "@/database/drizzle/repositories/perquisitions";
import useModalState from "@/hooks/useModalState";
import { wait } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const DeleteWarrant = () => {
    const { payload, closeModal } = useModalState();
    const queryClient = useQueryClient();
    const handleConfirm = async () => {
        // TODO: implement delete warrant logic
        await wait(1000);
        await deletesPerquisitions([payload.id]);
        queryClient.refetchQueries({ queryKey: ["USER_PERQUISITIONS_WARRANT"] });
        closeModal();
    };
    const handleCancel = () => {
        closeModal();
    };

    return (
        <div>
            <AlertModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                successMessage={`le mandat à été supprimé avec succès`}
                className="flex justify-end gap-3 lg:w-[25vw]"
            />
        </div>
    );
};

export default DeleteWarrant;
