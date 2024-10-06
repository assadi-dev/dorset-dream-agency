import { ERROR_TITLE_NOTIFY, SUCCESS_TITLE_NOTIFY } from "@/config/Messages";
import { toast } from "@/hooks/use-toast";

type ToastSuccessProps = {
    message: string;
};
export function ToastSuccess({ message }: ToastSuccessProps) {
    return toast({
        title: SUCCESS_TITLE_NOTIFY,
        description: message,
        variant: "success",
    });
}

export function ToastError({ message }: ToastSuccessProps) {
    return toast({
        title: ERROR_TITLE_NOTIFY,
        description: message,
        variant: "destructive",
    });
}
