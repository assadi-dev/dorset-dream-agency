import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, { useState } from "react";

type CheckBoxCardProps = {
    id: string;
    name: string;
    children: React.ReactNode;
} & React.HtmlHTMLAttributes<HTMLInputElement>;
const CheckBoxCard = ({ id, name, children, ...props }: CheckBoxCardProps) => {
    return (
        <label htmlFor={id} className="relative">
            <div
                className={cn(
                    "absolute top-1 right-1 p-1 rounded bg-gradient-to-b from-green-400 opacity-15 to-green-500 text-white transition-all ring-1 ring-green-600 shadow-xl",
                    "has-[:checked]:opacity-100 z-10",
                )}
            >
                <Check />
                <input type="checkbox" name={name} id={id} {...props} hidden />
            </div>

            {children}
        </label>
    );
};

export default CheckBoxCard;
