import React from "react";
import useModalState from "@/hooks/useModalState";
import { Pen, Trash } from "lucide-react";

import UploadZoneVariant, { UploadZoneForm } from "./UploadZoneVariant";

type RemoveButtonProps = {
    onRemoveAction?: () => void;
};
export const RemoveButton = ({ onRemoveAction }: RemoveButtonProps) => {
    return (
        <button
            type="button"
            className="grid place-items-center rounded-full h-5 w-5 ring-1  bg-destructive/25 ring-destructive text-destructive transition-all hover:bg-destructive hover:text-white active:scale-90"
            onClick={onRemoveAction}
        >
            <Trash className="w-2.5 h-2.5 " />
        </button>
    );
};

type EditButtonProps = {
    payload?: UploadZoneForm;
};
export const EditButton = ({ payload }: EditButtonProps) => {
    const { openModal } = useModalState();
    const handleClickModal = () => {
        openModal({
            title: `Modifier la variante ${payload?.name}`,
            payload,
            component: UploadZoneVariant,
        });
    };

    return (
        <button
            type="button"
            className="grid place-items-center rounded-full h-5 w-5 ring-1  transition-all active:scale-90"
            onClick={handleClickModal}
        >
            <Pen className="w-2.5 h-2.5 " />
        </button>
    );
};
