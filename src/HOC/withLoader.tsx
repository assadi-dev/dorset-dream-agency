import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import React from "react";

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean;
    iconClassName?: string;
} & ButtonProps;
type withLoaderProps = {
    isLoading?: boolean;
    children: React.ReactNode;
};

const withLoader = (Component: React.ComponentType<CustomButtonProps>, { children }: withLoaderProps) => {
    const EnhancedComponent: React.FC<CustomButtonProps> = ({ ...rest }) => {
        return (
            <Component {...rest} disabled={rest.isLoading}>
                {rest.isLoading && <Loader className={cn("mr-1 h-4 w-4", rest.iconClassName)} />}
                {children}
            </Component>
        );
    };
    EnhancedComponent.displayName = Component.displayName || Component.name || "ButtonComponentWithLoader";

    return EnhancedComponent;
};

export default withLoader;
