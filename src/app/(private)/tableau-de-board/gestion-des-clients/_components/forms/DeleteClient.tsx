import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { removeClient } from "../../actions";

const DeleteClient = () => {
    const { closeModal, payload } = useModalState();

    const clientID = payload?.id || null;
    const router = useRouter();
    const pathname = usePathname();

    const confirmDeleteClient = async () => {
        if (clientID) await removeClient([clientID]);
        closeModal();
        router.push("/tableau-de-board/gestion-des-clients");
        router.refresh();
    };

    return (
        <AlertModalContent
            onCancel={closeModal}
            onConfirm={confirmDeleteClient}
            className="flex justify-end lg:w-[25vw]"
        />
    );
};

export default DeleteClient;