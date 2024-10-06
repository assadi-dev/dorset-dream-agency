import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

type InputLabelWithErrorMessageType = InputProps & {
    label: string;
};
const InputLabelWithErrorMessage = React.forwardRef(({ label, ...props }: InputLabelWithErrorMessageType, ref) => {
    return (
        <div>
            <Label>{label}</Label>
            <Input {...props} />
            <div className="rounded bg-red-300 text-red-950 font-semibold">erreur</div>
        </div>
    );
});

InputLabelWithErrorMessage.displayName = "InputLabelWithErrorMessage";
export default InputLabelWithErrorMessage;
