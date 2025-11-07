"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles } from "lucide-react";
import React from "react";
import { handleAIAction } from "../utils";

const AskAiButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm" title="Demander à l'IA">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Demander à l'IA
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleAIAction("Générer une description")}>
                    Générer une description
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAIAction("Reformuler")}>Reformuler</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAIAction("Corriger")}>Corriger</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AskAiButton;
