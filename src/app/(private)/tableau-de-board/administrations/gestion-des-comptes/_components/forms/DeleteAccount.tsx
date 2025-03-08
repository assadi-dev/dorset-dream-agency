import useModalState from "@/hooks/useModalState";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { removeUsersAccounts } from "../../action";
import { FORBIDDEN_ACTION } from "@/config/messages";
import { RoleEnum } from "@/app/types/user";
import { isAdmin } from "@/lib/utils";
import { useSession } from "next-auth/react";

const DeleteAccount = () => {
    const { closeModal, payload } = useModalState();
    const router = useRouter();
    const pathname = usePathname();
    const session = useSession();
    const role = session.data?.user?.role;

    const handleConfirm = async () => {
        const ids = payload.ids;
        if (isAdmin(payload.role) && !isAdmin(role)) throw new Error(FORBIDDEN_ACTION);
        await removeUsersAccounts(ids);
        closeModal();
        payload.resetSelected && payload.resetSelected();
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
