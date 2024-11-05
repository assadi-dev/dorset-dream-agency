import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { setAvailableProperty } from "../helper";

type SwitchAvailableProps = {
    property: {
        id: number;
        isAvailable: boolean;
        name: string;
        propertyID: number;
    } | null;
};
const SwitchAvailable = ({ property }: SwitchAvailableProps) => {
    const [checked, setChecked] = React.useState(property?.isAvailable);

    const handleChange = async (checked: boolean) => {
        try {
            setChecked(checked);
            const state = checked ? "disponible" : "non disponible";
            const MESSAGE_SUCCESS = `La propriété ${property?.name} est maintenant ${state}`;
            if (property?.propertyID) {
                await setAvailableProperty(property.propertyID, checked);
            }
            ToastSuccessSonner(MESSAGE_SUCCESS);
        } catch (error: any) {
            if (error instanceof Error) {
                ToastErrorSonner(error.message);
            }
        }
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

export default SwitchAvailable;
