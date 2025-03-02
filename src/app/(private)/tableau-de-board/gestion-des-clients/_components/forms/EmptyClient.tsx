import AvertissementHeader from "@/components/Alerts/AvertissementHeader";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { emptyClientAction } from "../../actions";
import { isAdmin } from "@/lib/utils";
import { FORBIDDEN_ACTION } from "@/config/messages";
import { useSession } from "next-auth/react";

const EmptyClient = () => {
    const { closeModal, payload } = useModalState();

    const session = useSession();
    const role = session.data?.user?.role;
    const { refreshWithParams } = useRouteRefresh();

    const confirmEmptyClient = async () => {
        if (!isAdmin(role)) throw new Error(FORBIDDEN_ACTION);
        await emptyClientAction();
        closeModal();
        refreshWithParams();
    };

    return (
        <div className="lg:max-w-[30vw]">
            <div className="ring-1 ring-destructive p-5 rounded shadow-lg bg-red-100 text-red-900  mx-auto">
                <p>Cette action entraînera la suppression de tous les clients stockés dans la base de données.</p>
            </div>

            <AlertModalContent
                onCancel={closeModal}
                onConfirm={confirmEmptyClient}
                className="flex justify-end gap-2 pt-3"
            />
        </div>
    );
};

export default EmptyClient;
