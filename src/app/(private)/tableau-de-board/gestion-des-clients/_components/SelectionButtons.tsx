import ButtonActionWithTooltip from "@/components/Buttons/ButtonActionWithTooltip";
import { ButtonProps } from "@/components/ui/button";
import { Skull, Trash } from "lucide-react";

export const DeleteButton = ({ ...props }: ButtonProps) => {
    return (
        <ButtonActionWithTooltip
            label="Supprimer"
            tooltipTitle="Supprimer le(s) client(s) sélectionné(s)"
            {...props}
            icon={Trash}
        />
    );
};

export const DeathButton = ({ ...props }) => {
    return (
        <ButtonActionWithTooltip
            label="Déclarer mort"
            icon={Skull}
            tooltipTitle="Déclarer le(s) client(s) sélectionné(s) mort"
            {...props}
        />
    );
};
