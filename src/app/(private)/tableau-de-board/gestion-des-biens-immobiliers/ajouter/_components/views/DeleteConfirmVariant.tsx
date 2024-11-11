import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { useFormContext } from "react-hook-form";
import { removeVariants } from "../form/helpers";
import { wait } from "@/lib/utils";
import { removeVariantsWithGallery } from "@/database/drizzle/repositories/variants";
import { clearVariantsWithGallery } from "../../../modifier/action";

const DeleteConfirmVariant = () => {
    const { payload, closeModal } = useModalState();

    const form = useFormContext();
    const handleConfirm = async () => {
        try {
            //TODO Faire l'appel api ici pour supprimer la variant du serveur
            if (payload && typeof payload.id === "number") {
                console.log("delete variante id:", payload.id);
                await wait(1000);
                const formData = new FormData();
                formData.append("ids", payload.id);
                clearVariantsWithGallery(formData);
            }

            if (form) {
                const currentVariants = form.getValues("variants");
                const variantsRemoved = removeVariants(currentVariants, [payload.id]);
                form.setValue("variants", variantsRemoved);
            }

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
            successMessage={`la variante ${payload.name} à été supprimé avec succès`}
            className="flex justify-end gap-3 lg:w-[25vw]"
        />
    );
};

export default DeleteConfirmVariant;
