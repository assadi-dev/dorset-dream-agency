import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { AnnouncementType } from "../../../type";
import { removeAnnounce } from "../../../ajouter/actions";
import useRouteRefresh from "@/hooks/useRouteRefresh";

const ConfirmDeleteAnnonce = () => {
    const { payload, closeModal } = useModalState();
    payload as AnnouncementType;
    const { refreshWithParams } = useRouteRefresh();

    const confirmDelete = async () => {
        try {
            if (payload) {
                await removeAnnounce(payload.id);
                refreshWithParams();
                closeModal();
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`une erreur est survenue lors de la suppression de l'annonce raison: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <AlertModalContent
                onConfirm={confirmDelete}
                onCancel={closeModal}
                className="flex justify-end gap-3 lg:w-[25vw]"
                successMessage={`L'annonce ${payload?.title} à été supprimée avec succès`}
            />
        </div>
    );
};

export default ConfirmDeleteAnnonce;
