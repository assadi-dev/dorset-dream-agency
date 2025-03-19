"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackButton = () => {
    const router = useRouter();
    return (
        <div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="bg-gradient-primary drop-shadow-lg flex items-center border border-black/25 hover:underline"
            >
                <ChevronLeftCircle className="h-10 w-10" /> Précédent
            </Button>
        </div>
    );
};

export default GoBackButton;
