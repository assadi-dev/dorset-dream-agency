import { plural } from "@/lib/format";
import React from "react";

type EmployeeSelectedActionsProps = {
    itemSelected: Record<string, string>[];
};
const EmployeeSelectedActions = ({ itemSelected }: EmployeeSelectedActionsProps) => {
    const numberSelected = itemSelected.length > 0 ? itemSelected.length : null;
    return (
        <div className="flex items-center gap-2">
            {numberSelected && (
                <p>
                    {numberSelected}{" "}
                    {`${plural(numberSelected, "élément", "éléments")} ${plural(numberSelected, "sélectionnée", "sélectionnées")}`}
                </p>
            )}
        </div>
    );
};

export default EmployeeSelectedActions;
