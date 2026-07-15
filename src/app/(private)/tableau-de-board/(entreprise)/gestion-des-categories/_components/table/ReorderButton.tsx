"use client"

import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";


export default function ReorderButton({ isReordering, onClick }: { isReordering: boolean, onClick: () => void }) {

    const variant = isReordering ? "default" : "outline";
    const text = isReordering ? "Terminer" : "Réordonner";


    return (
        <Button variant={variant} size={"sm"} onClick={onClick} className="min-w-32" >
            <ListChecks />
            {text}
        </Button>
    );
}