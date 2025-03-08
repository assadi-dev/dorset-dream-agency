import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { removeTransaction } from "../../actions";
import { usePathname, useRouter } from "next/navigation";

const DeleteTransaction = () => {
    const { closeModal, payload } = useModalState();

    const transactionID = payload.ids || null;
    const router = useRouter();
    const pathname = usePathname();

    const confirmDeleteTransaction = async () => {
        transactionID && removeTransaction(transactionID);
        closeModal();
        payload.resetSelectedRow && payload.resetSelected();
        router.push(pathname);
    };

    return (
        <div>
            <AlertModalContent
                onCancel={closeModal}
                onConfirm={confirmDeleteTransaction}
                className="flex justify-end gap-3 lg:w-[25vw]"
            />
        </div>
    );
};

export default DeleteTransaction;
