import React from "react";
import { Button } from "../ui/button";
import { ToastErrorSonner, ToastSuccessSonner } from "../notify/Sonner";

type AlertModalContentProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    onCancel?: () => any;
    onConfirm?: () => any;
    onOpenChange?: () => any;
    successMessage?: string | null;
    errorMessage?: string | null;
    children?: React.ReactNode;
};
const AlertModalContent = ({ onCancel, onConfirm, successMessage, errorMessage, ...props }: AlertModalContentProps) => {
    const SUCCESS_MESSAGE = successMessage || "Opération réussie avec success";
    const ERROR_MESSAGE = errorMessage || "Une erreur est survenue lors de l'operation";

    const handleConfirm = () =>
        new Promise(async (resolve) => {
            try {
                if (onConfirm) {
                    await onConfirm();
                    ToastSuccessSonner(SUCCESS_MESSAGE);
                }

                resolve("action confirmed");
            } catch (error: any) {
                ToastErrorSonner(ERROR_MESSAGE);
            }
        });
    const handleCancel = () =>
        new Promise((resolve) => {
            if (onCancel) {
                onCancel();
            }
            resolve("action canceled !");
        });

    return (
        <div {...props}>
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
