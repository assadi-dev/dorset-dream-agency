import useModalState from "@/hooks/useModalState";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { removeUsersAccounts } from "../../action";
import { ToastErrorSonner } from "@/components/notify/Sonner";

const DeleteAccount = () => {
    const { closeModal, payload } = useModalState();
    const router = useRouter();
    const pathname = usePathname();

    const handleConfirm = async () => {
        try {
            const ids = [payload.id];
            await removeUsersAccounts(ids);
            closeModal();
            router.push(pathname);
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <AlertModalContent
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            className="flex justify-end gap-3 lg:w-[25vw]"
        />
    );
};

export default DeleteAccount;
