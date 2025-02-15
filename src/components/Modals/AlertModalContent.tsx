import React from "react";
import { Button } from "../ui/button";
import { ToastErrorSonner, ToastSuccessSonner } from "../notify/Sonner";
import ButtonWithLoader from "../forms/ButtonWithLoader";

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
    const [isPending, startTransition] = React.useTransition();

    const handleConfirm = () =>
        new Promise(async (resolve) => {
            try {
                if (onConfirm) {
                    startTransition(async () => {
                        try {
                            await onConfirm();
                            ToastSuccessSonner(SUCCESS_MESSAGE);
                            resolve("action confirmed");
                        } catch (error) {
                            if (error instanceof Error) {
                                ToastErrorSonner(error.message);
                            }
                        }
                    });
                }
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

    const CONFIRM_LABEL = isPending ? "Confirmer" : "Confirmer";

    return (
        <div {...props}>
            <Button type="button" onClick={handleCancel} variant="ghost">
                Annuler
            </Button>

            <ButtonWithLoader type="button" variant="default" onClick={handleConfirm} isLoading={isPending}>
                {CONFIRM_LABEL}
            </ButtonWithLoader>
        </div>
    );
};

export default AlertModalContent;
