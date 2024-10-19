import React from "react";
import { Button } from "../ui/button";
import { ToastErrorSonner, ToastSuccessSonner } from "../notify/Sonner";

type AlertModalContentProps = {
    onCancel?: () => any;
    onConfirm?: () => any;
    onOpenChange?: () => any;
    children?: React.ReactNode;
};
const AlertModalContent = ({ onCancel, onConfirm }: AlertModalContentProps) => {
    const handleConfirm = () =>
        new Promise(async (resolve) => {
            try {
                if (onConfirm) {
                    await onConfirm();
                    ToastSuccessSonner("Opération réussie avec success");
                }

                resolve("action confirmed");
            } catch (error) {
                ToastErrorSonner("Une erreur est survenue lors de l'operation");
            }
        });
    const handleCancel = () =>
        new Promise((resolve) => {
            onCancel && onCancel();
            resolve("action canceled !");
        });

    return (
        <div className="flex justify-end gap-3 lg:w-[25vw]">
            <Button type="button" onClick={handleCancel} variant="ghost">
                Annuler
            </Button>
            <Button type="button" variant="default" onClick={handleConfirm}>
                Confirmer
            </Button>
        </div>
    );
};

export default AlertModalContent;
