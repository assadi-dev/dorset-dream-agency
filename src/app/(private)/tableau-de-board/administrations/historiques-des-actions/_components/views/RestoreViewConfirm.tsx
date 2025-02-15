import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import React from "react";
import { restoreFunctions } from "../../../corbeille/helpers";

const RestoreViewConfirm = () => {
    const { payload, closeModal } = useModalState();
    const { refresh } = useRouteRefresh();
    const handleCancel = () => {
        closeModal();
    };

    const handleConfirm = async () => {
        const entity = payload.entity as keyof typeof restoreFunctions;
        await restoreFunctions[entity](payload);
        closeModal();
        refresh();
    };
    return (
        <div>
            <div className="my-3 p-8 bg-cyan-100 font-semibold rounded shadow-lg">
                <p className="text:xs lg:text-sm text-center ">
                    Voulez vous restaurer les donnees de l'action {payload.description}
                </p>
            </div>
            <div className="flex justify-end">
                <AlertModalContent
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    className="flex justify-end gap-3 lg:w-[25vw]"
                />
            </div>
        </div>
    );
};

export default RestoreViewConfirm;
