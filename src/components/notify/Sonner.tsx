import { ERROR_TITLE_NOTIFY, SUCCESS_TITLE_NOTIFY } from "@/config/messages";
import { toast } from "sonner";

export function ToastSuccessSonner(message: string) {
    toast.success(SUCCESS_TITLE_NOTIFY, {
        description: message,
    });
}

export function ToastErrorSonner(message: string) {
    toast.error(ERROR_TITLE_NOTIFY, {
        description: message,
    });
}
