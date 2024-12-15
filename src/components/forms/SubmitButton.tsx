import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmitButtonProps = React.RefAttributes<HTMLButtonElement> &
    ButtonProps & {
        isLoading: boolean;
        children: React.ReactNode;
        iconClassName?: string;
    };
const SubmitButton = ({ isLoading, children, iconClassName, ...props }: SubmitButtonProps) => {
    return (
        <Button {...props} disabled={isLoading || props.disabled}>
            {isLoading && <Loader className={cn("mr-1 h-4 w-4 animate-spin", iconClassName)} />}
            {children}
        </Button>
    );
};

export default SubmitButton;
