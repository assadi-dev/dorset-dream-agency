import AlertModalContent from "@/components/Modals/AlertModalContent";
import { deleteEmployee } from "@/database/drizzle/repositories/employee";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DeleteForm = () => {
    const { payload, closeModal } = useModalState();
    const EMPLOYEE_ID = payload.id;
    const router = useRouter();
    const pathname = usePathname();

    const handleCancel = () => {
        closeModal();
    };
    const handleConfirm = async () => {
        try {
            const ids = [EMPLOYEE_ID];
            await deleteEmployee(ids);
            closeModal();
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
