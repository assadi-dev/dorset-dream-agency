"use client";
import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";
import React from "react";
import EditForm from "../../_components/forms/EditForm";
import { clientDetailType } from "../actions/actions";
import DeleteClient from "../../_components/forms/DeleteClient";

type ActionButtonType = {
    client?: clientDetailType | null;
    canUpdate?: boolean;
    canDelete?: boolean;
};
const ActionDetailClient = ({ client, canDelete, canUpdate }: ActionButtonType) => {
    const { openModal } = useModalState();

    const handleClickEdit = () => {
        openModal({
            title: "Modifier",
            component: () => <EditForm />,
            description: "Modifier les données personnel du client",
            payload: client,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: "Supprimer",
            component: () => <DeleteClient />,
            description:
                "Supprimer ce client entraînera la suppression des informations le concernant ainsi que les transaction qui lui son associé",
            payload: { client, ids: [client?.id] },
        });
    };
    return (
        <div className="lg:grid lg:grid-rows-2 self-end mb-8 p-3 gap-3">
            {canUpdate && (
                <Button variant="outline" className="bg-primary" onClick={handleClickEdit}>
                    Modifier
                </Button>
            )}
            {canDelete && (
                <Button variant="destructive" onClick={handleClickDelete}>
                    Supprimer
                </Button>
            )}
        </div>
    );
};

export default ActionDetailClient;
