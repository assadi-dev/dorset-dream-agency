import React from "react";
import useModalState from "@/hooks/useModalState";
import { Pen, Trash, Trash2 } from "lucide-react";

import UploadZoneVariant, { UploadZoneForm } from "../form/UploadZoneVariant";
import EditUploadZoneVariant from "./EditUploadZoneVariant";
import ButtonActionWithTooltip from "@/components/Buttons/ButtonActionWithTooltip";

type RemoveButtonProps = {
    onRemoveAction?: () => void;
};
export const RemoveButton = ({ onRemoveAction }: RemoveButtonProps) => {
    return (
        <ButtonActionWithTooltip
            icon={<Trash2 className="w-2.5 h-2.5 scale-75 " />}
            tooltipTitle="Supprimer"
            size="icon"
            className=" grid place-items-center rounded-full h-5 w-5 ring-1  bg-destructive/25 ring-destructive text-destructive transition-all hover:bg-destructive hover:text-white active:scale-90"
        />
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
            component: EditUploadZoneVariant,
        });
    };

    return (
        <ButtonActionWithTooltip
            icon={<Pen className="w-2.5 h-2.5 scale-75 " />}
            tooltipTitle="Modifier"
            variant={"ghost"}
            size="icon"
            className="grid place-items-center rounded-full h-5 w-5 ring-1 transition-all   active:scale-90"
            onClick={handleClickModal}
        />
    );
};
