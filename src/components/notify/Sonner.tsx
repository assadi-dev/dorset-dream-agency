import { ERROR_TITLE_NOTIFY, INFO_TITLE_NOTIFY, SUCCESS_TITLE_NOTIFY } from "@/config/messages";
import { toast } from "sonner";

export function ToastSuccessSonner(message: string) {
    toast.success(SUCCESS_TITLE_NOTIFY, {
        description: message,
    });
}

export function ToastErrorSonner(message: string, duration?: number) {
    toast.error(ERROR_TITLE_NOTIFY, {
        description: message,
        duration: duration || 8000,
    });
}

export function ToastInfoSonner({ title, description }: { title?: string; description: string }, duration?: number) {
    toast.info(title ?? INFO_TITLE_NOTIFY, {
        description,
        duration: duration || 8000,
    });
}
export function ToastWarningSonner(message: string, duration?: number) {
    toast.warning(ERROR_TITLE_NOTIFY, {
        description: message,
        duration: duration || 8000,
    });
}
