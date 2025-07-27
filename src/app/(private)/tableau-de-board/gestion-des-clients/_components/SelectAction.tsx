import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import React from "react";
import ActionDropdown from "./ActionDropdown";

type SelectActionProps = {
    mode: "none" | "multiple";
    selected: number[];
    toggleModCard: () => void;
    totalCount: number;
};
const SelectAction = ({ mode, selected, totalCount, toggleModCard }: SelectActionProps) => {
    return (
        <div className="flex flex-col  xl:flex-row  gap-1 items-center w-full">
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={toggleModCard}
                className="flex items-center gap-1 min-w-[120px] w-full  xl:w-fit"
            >
                <Square />
                {mode === "multiple" ? "Annuler" : "Sélectionner"}
            </Button>

            {selected.length > 0 && (
                <ActionDropdown selected={selected} totalCount={totalCount} toggleModCard={toggleModCard} />
            )}
        </div>
    );
};

export default SelectAction;
