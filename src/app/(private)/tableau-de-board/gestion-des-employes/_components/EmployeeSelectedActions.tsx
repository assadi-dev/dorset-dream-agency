import { plural } from "@/lib/format";
import { selectedLabel } from "@/lib/text";
import React from "react";
import SelectionActions from "./SelectedActions";

type EmployeeSelectedActionsProps = {
    itemSelected: Record<string, string>[];
    resetSelectedRow?: () => void;
};
const EmployeeSelectedActions = ({ itemSelected, resetSelectedRow }: EmployeeSelectedActionsProps) => {
    const numberSelected = itemSelected.length > 0 ? itemSelected.length : null;
    return (
        <div className="flex items-center gap-2">
            {numberSelected && <p>{selectedLabel(numberSelected)}</p>}
            <SelectionActions selectedItems={itemSelected} resetSelected={resetSelectedRow} />
        </div>
    );
};

export default EmployeeSelectedActions;
