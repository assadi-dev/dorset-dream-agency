import React from "react";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type AlertDestructiveProps = {
    title: string;
    description: string;
};
export function AlertDestructive({ title, description }: AlertDestructiveProps) {
    return (
        <Alert variant="destructive" className={cn("bg-red-300", "text-red-900")}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
}

export default AlertDestructive;
