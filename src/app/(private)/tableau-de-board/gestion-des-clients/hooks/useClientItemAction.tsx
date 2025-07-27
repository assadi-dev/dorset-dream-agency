import React from "react";
import { CircleAlert, Skull, Trash2 } from "lucide-react";
import useModalState from "@/hooks/useModalState";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import DeceasedConfirm from "../_components/forms/DeceasedConfirm";
import { plural } from "@/lib/format";
import DeleteClient from "../_components/forms/DeleteClient";
import EmptyClient from "../_components/forms/EmptyClient";

type useClientItemActionProps = {
    selected: number[];
    toggleModCard: () => void;
};
const useClientItemAction = ({ selected, toggleModCard }: useClientItemActionProps) => {
    const { openModal } = useModalState();

    const handleClickDeceased = () => {
        if (selected.length === 0) {
            ToastErrorSonner("Vous devez sélectionnez au moins 1 client pour effectué cette action");
            return;
        }
        openModal({
            title: "Declaration de décès",
            description: `${selected.length} ${plural(selected.length | 1, "élément", "éléments")} ${plural(selected.length | 1, "sélectionné", "sélectionnés")}`,
            component: DeceasedConfirm,
            payload: {
                ids: selected,
                value: true,
                toggleModCard,
            },
        });
    };

    const handleClickDelete = () => {
        if (selected.length === 0) {
            ToastErrorSonner("Vous devez sélectionnez au moins 1 client pour effectué cette action");
            return;
        }

        openModal({
            title: "Suppression des clients",
            description: `${selected.length} ${plural(selected.length | 1, "élément", "éléments")} ${plural(selected.length | 1, "sélectionné", "sélectionnés")}`,
            component: DeleteClient,
            payload: {
                ids: selected,
            },
        });
    };

    const handleClickEmpty = () => {
        openModal({
            title: "Suppression des clients",
            description: `Suppression de tout les client enregistrés`,
            component: EmptyClient,
        });
    };

    const ListActionItems: {
        title: string;
        icon: any;
        tooltipMessage: string;
        handler: () => void;
    }[] = [
        {
            title: "Déclarer mort",
            icon: Skull,
            tooltipMessage: "Déclarer le(s) client(s) sélectionné(s) mort",
            handler: handleClickDeceased,
        },
        {
            title: "Supprimer",
            icon: Trash2,
            tooltipMessage: "Supprimer le(s) client(s) sélectionné(s)",
            handler: handleClickDelete,
        },
        {
            title: "Vider",
            icon: CircleAlert,
            tooltipMessage: "Supprimer la totalité des clients enregistré",
            handler: handleClickEmpty,
        },
    ];

    return {
        ListActionItems,
    };
};

export default useClientItemAction;
