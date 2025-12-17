import { Switch } from "@/components/ui/switch";
import React from "react";

type ActionPermissionSwitcherProps = {
    ressource?: string;
    checked: boolean;
    fieldName: string;
    onChecked?: () => {};
};
const ActionPermissionSwitcher = ({ fieldName, checked, onChecked }: ActionPermissionSwitcherProps) => {
    return (
        <div className="flex items-center space-x-2">
            <Switch
                className="border hover:border-white/50 shadow-inner shadow-white/50 transition-all duration-300"
                id={fieldName}
                defaultChecked={checked}
            />
        </div>
    );
};

export default ActionPermissionSwitcher;
