import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";

import { Skull, Square, Trash } from "lucide-react";
import React from "react";
import DeceasedConfirm from "./forms/DeceasedConfirm";
import { plural } from "@/lib/format";
import { ToastErrorSonner } from "@/components/notify/Sonner";

type SelectActionProps = {
    mode: "none" | "multiple";
    selected: number[];
    toggleModCard: () => void;
};
const SelectAction = ({ mode, selected, toggleModCard }: SelectActionProps) => {
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
            },
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
                <div className="bg-slate-100 py-1 flex gap-1   transition-all">
                    <Button type="button" size="sm" variant="outline" onClick={handleClickDeceased}>
                        <Skull /> Déclarer mort
                    </Button>

                    {/*    <Button type="button" size="sm" variant="outline">
                            <Trash /> Supprimer
                        </Button> */}
                </div>
            )}
        </div>
    );
};

export default SelectAction;
