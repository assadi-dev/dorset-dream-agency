"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import { wait } from "@/lib/utils";

const SaverActionsPermissions = () => {
    const [pending, startTransition] = useTransition();

    const role = "Administrateur";
    const handleClickSave = async () => {
        try {
            startTransition(async () => {
                await wait(1500);
            });
        } catch (error) {
            if (error instanceof Error) {
                ToastErrorSonner(
                    `Une erreur est survenu lors de l'enregistrement des permissions pour le role: ${role}`,
                );
            }
        }
    };

    const Icon = pending ? <Loader className="animate-spin h-4 w-4" /> : <Save className="w-4 h-4" />;
    const Label = pending ? "Enregistrement en cours..." : "Enregistrer";

    return (
        <div>
            <Button className="" onClick={handleClickSave} disabled={pending}>
                {Icon}
                {Label}
            </Button>
        </div>
    );
};

export default SaverActionsPermissions;
