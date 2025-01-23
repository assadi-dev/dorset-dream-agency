import useModalState from "@/hooks/useModalState";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { removeUsersAccounts } from "../../action";

const DeleteAccount = () => {
    const { closeModal, payload } = useModalState();
    const router = useRouter();
    const pathname = usePathname();

    const handleConfirm = async () => {
        const ids = [payload.id];
        await removeUsersAccounts(ids);
        closeModal();
        router.push(pathname);
        router.refresh();
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
