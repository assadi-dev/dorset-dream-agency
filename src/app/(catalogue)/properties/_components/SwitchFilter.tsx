import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SwitchFilter = () => {
    const [checked, setChecked] = React.useState();

    const handleChange = async (checked: boolean) => {
        setChecked(checked);
    };

    return (
        <div className="flex items-center space-x-2 justify-center">
            <Switch
                className="border hover:border-white/50 shadow-inner shadow-white/50 transition-all duration-300"
                id="isAvailable"
                checked={checked}
                onCheckedChange={handleChange}
            />
        </div>
    );
};

export default SwitchFilter;
