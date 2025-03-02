import AvertissementHeader from "@/components/Alerts/AvertissementHeader";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const EmptyClient = () => {
    const { closeModal, payload } = useModalState();

    const clientIDs = payload?.ids || null;
    const { refreshWithParams } = useRouteRefresh();

    const confirmDeleteClient = async () => {
        //if (clientIDs.length) await removeClient(clientIDs);
        closeModal();
        refreshWithParams();
    };

    return (
        <div className="lg:max-w-[30vw]">
            <div className="ring-1 ring-destructive p-3 rounded shadow-lg bg-red-100 text-red-900  mx-auto">
                <p>
                    <strong>Attention</strong> : Cette action entraînera la suppression de tous les clients stockés dans
                    la base de données.
                </p>
            </div>

            <div className="pt-3 flex justify-end">
                {" "}
                <AlertModalContent
                    onCancel={closeModal}
                    onConfirm={confirmDeleteClient}
                    className="flex justify-end lg:w-[25vw]"
                />
            </div>
        </div>
    );
};

export default EmptyClient;
