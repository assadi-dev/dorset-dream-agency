import AlertModalContent from "@/components/Modals/AlertModalContent";
import { FORBIDDEN_ACTION } from "@/config/messages";
import { deleteEmployee } from "@/database/drizzle/repositories/employee";
import useModalState from "@/hooks/useModalState";
import { isAdmin } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DeleteForm = () => {
    const { payload, closeModal } = useModalState();
    const router = useRouter();
    const pathname = usePathname();
    const session = useSession();
    const role = session.data?.user?.role;

    const handleCancel = () => {
        closeModal();
    };
    const handleConfirm = async () => {
        try {
            if (isAdmin(payload.role) && !isAdmin(role)) throw new Error(FORBIDDEN_ACTION);

            const ids = payload.ids;
            await deleteEmployee(ids);
            closeModal();
            payload?.resetSelected && payload.resetSelected();
            router.push(pathname);
            router.refresh();
        } catch (error: any) {
            throw error;
        }
    };

    return (
        <div>
            <AlertModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                className="flex justify-end gap-3 lg:w-[25vw]"
            />
        </div>
    );
};

export default DeleteForm;
