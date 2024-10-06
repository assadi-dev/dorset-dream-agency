"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    classNamButton?: string;
}
const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ className, classNamButton, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative w-full">
            <Input ref={ref} type={showPassword ? "text" : "password"} className={cn("pr-10", className)} {...props} />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", classNamButton)}
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </Button>
        </div>
    );
});

InputPassword.displayName = "InputPassword";
export default InputPassword;
