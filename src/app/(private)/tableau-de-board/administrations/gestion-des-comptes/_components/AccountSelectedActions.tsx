import React from "react";
import SelectionActions from "./SelectedActions";
import { selectedLabel } from "@/lib/text";
import { SelectionAction } from "@/app/types/generic";

type EmployeeSelectedActionsProps = SelectionAction;
const AccountSelectedActions = ({ selectedItems, resetSelected }: EmployeeSelectedActionsProps) => {
    const numberSelected = selectedItems?.length > 0 ? selectedItems?.length : null;
    return (
        <div className="flex items-center gap-2">
            {numberSelected && <p>{selectedLabel(numberSelected)}</p>}
            <SelectionActions selectedItems={selectedItems} resetSelected={resetSelected} />
        </div>
    );
};

export default AccountSelectedActions;
