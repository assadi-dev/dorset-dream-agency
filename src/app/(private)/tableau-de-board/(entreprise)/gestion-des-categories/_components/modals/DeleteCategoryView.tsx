
"use client"

import AlertModalContent from "@/components/Modals/AlertModalContent";
import { FORBIDDEN_ACTION } from "@/config/messages";
import useModalState from "@/hooks/useModalState";
import { isAdmin } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCategoriesMutation } from "../../_hooks/useCategoriesMutation";

export default function DeleteCategoryView() {


    const { payload, closeModal } = useModalState();
    const { remove } = useCategoriesMutation();

    const session = useSession();
    const role = session.data?.user?.role;

    const handleCancel = () => {
        closeModal();
    };
    const handleConfirm = async () => {
        try {
            if (isAdmin(payload.role) && !isAdmin(role)) throw new Error(FORBIDDEN_ACTION);
            const ids = payload.ids;
            await remove(ids);
            closeModal();
            payload?.resetSelected && payload.resetSelected();
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
}