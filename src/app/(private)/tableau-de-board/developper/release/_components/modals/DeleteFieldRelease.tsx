import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { ReleaseFormInfer } from "../schema";
import { UseFormReturn } from "react-hook-form";

const DeleteFieldRelease = () => {
    const { closeModal, payload } = useModalState();
    const handleCancel = () => {
        closeModal();
    };

    const form = payload.form as UseFormReturn<ReleaseFormInfer>;
    const fieldEntries = payload.field as { id: string; name: string; value: string };

    const handleConfirm = () => {
        const currentFields = structuredClone(form.getValues("fields"));
        const updateCollection = currentFields.filter((f) => f.id != fieldEntries.id);
        form.setValue("fields", updateCollection);
        closeModal();
    };

    const SUCCESS_MESSAGE = `L'entrée ${payload.field.name} à été supprimé`;

    return (
        <AlertModalContent
            className="flex justify-end gap-1 w-[28vw]"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            successMessage={SUCCESS_MESSAGE}
        />
    );
};

export default DeleteFieldRelease;
