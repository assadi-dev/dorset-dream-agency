import React from "react";
import { Button } from "../ui/button";
import { ToastErrorSonner, ToastSuccessSonner } from "../notify/Sonner";

type AlertModalContentProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    onCancel?: () => any;
    onConfirm?: () => any;
    onOpenChange?: () => any;
    children?: React.ReactNode;
};
const AlertModalContent = ({ onCancel, onConfirm, ...props }: AlertModalContentProps) => {
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
