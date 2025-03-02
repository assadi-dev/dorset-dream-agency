import ButtonActionWithTooltip from "@/components/Buttons/ButtonActionWithTooltip";
import { ButtonProps } from "@/components/ui/button";
import { CircleAlert, Skull, Trash, Trash2 } from "lucide-react";

export const DeleteButton = ({ ...props }: ButtonProps) => {
    return (
        <ButtonActionWithTooltip
            label="Supprimer"
            tooltipTitle="Supprimer le(s) client(s) sélectionné(s)"
            {...props}
            icon={<Trash2 />}
        />
    );
};

export const DeathButton = ({ ...props }: ButtonProps) => {
    return (
        <ButtonActionWithTooltip
            label="Déclarer mort"
            icon={<Skull />}
            tooltipTitle="Déclarer le(s) client(s) sélectionné(s) mort"
            {...props}
        />
    );
};

export const EmptyClientsButton = ({ ...props }: ButtonProps) => {
    return (
        <ButtonActionWithTooltip
            label="Vider"
            icon={<CircleAlert />}
            tooltipTitle="Supprimer la totalité des clients"
            {...props}
        />
    );
};
