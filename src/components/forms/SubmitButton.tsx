import withLoader from "@/HOC/withLoader";
import React from "react";
import { Button, ButtonProps } from "../ui/button";

type SubmitButtonProps = React.RefAttributes<HTMLButtonElement> &
    ButtonProps & {
        isLoading: boolean;
        children: React.ReactNode;
    };
const SubmitButton = ({ isLoading, children, ...props }: SubmitButtonProps) => {
    const ButtonWithLoader = withLoader(Button, { children });
    return (
        <ButtonWithLoader isLoading={isLoading} iconClassName="animate-spin mr-2" {...props}>
            {children}
        </ButtonWithLoader>
    );
};

export default SubmitButton;
