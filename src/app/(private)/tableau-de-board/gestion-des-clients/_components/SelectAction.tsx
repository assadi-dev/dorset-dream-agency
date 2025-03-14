import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";

import { Square } from "lucide-react";
import React from "react";
import DeceasedConfirm from "./forms/DeceasedConfirm";
import { plural } from "@/lib/format";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import { DeathButton, DeleteButton, EmptyClientsButton } from "./SelectionButtons";
import DeleteClient from "./forms/DeleteClient";
import EmptyClient from "./forms/EmptyClient";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/lib/utils";

type SelectActionProps = {
    mode: "none" | "multiple";
    selected: number[];
    toggleModCard: () => void;
    totalCount: number;
};
const SelectAction = ({ mode, selected, totalCount, toggleModCard }: SelectActionProps) => {
    const session = useSession();
    const role = session.data?.user?.role;

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

    return (
        <div className="flex gap-1 items-center">
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={toggleModCard}
                className="flex items-center gap-1"
            >
                <Square />
                {mode === "multiple" ? "Annuler" : "Sélectionner"}
            </Button>
            {mode === "multiple" && (
                <div className="py-1 flex gap-1   transition-all">
                    <DeathButton size="sm" variant="outline" onClick={handleClickDeceased} />
                    <DeleteButton type="button" variant={"outline"} size={"sm"} onClick={handleClickDelete} />
                    {isAdmin(role) && totalCount > 0 && (
                        <EmptyClientsButton
                            type="button"
                            variant={"destructive"}
                            size={"sm"}
                            onClick={handleClickEmpty}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectAction;
