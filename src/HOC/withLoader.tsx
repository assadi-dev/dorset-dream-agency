import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean;
    iconClassName?: string;
};
type withLoaderProps = {
    isLoading?: boolean;
    children: React.ReactNode;
};

const withLoader = (Component: React.ComponentType<ButtonProps>, { children }: withLoaderProps) => {
    const EnhancedComponent: React.FC<ButtonProps> = ({ ...rest }) => {
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
