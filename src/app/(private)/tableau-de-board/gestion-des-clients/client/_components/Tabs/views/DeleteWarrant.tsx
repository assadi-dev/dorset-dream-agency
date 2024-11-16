import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import { wait } from "@/lib/utils";
import React from "react";

const DeleteWarrant = () => {
    const { payload, closeModal } = useModalState();
    const handleConfirm = async () => {
        // TODO: implement delete warrant logic
        await wait(1000);
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
