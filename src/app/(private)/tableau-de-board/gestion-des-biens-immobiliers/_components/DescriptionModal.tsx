"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/Text/RichTextEditor/RichTextEditor";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DescriptionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialDescription?: string;
    onSave: (description: string) => void;
}

export function DescriptionModal({ open, onOpenChange, initialDescription = "", onSave }: DescriptionModalProps) {
    const [description, setDescription] = useState(initialDescription);

    const handleSave = () => {
        onSave(description);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Ajouter une description</DialogTitle>
                    <DialogDescription>
                        Décrivez votre bien immobilier en détail pour attirer plus d'acheteurs ou de locataires.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <RichTextEditor content={description} onChange={setDescription} />
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>
                        Annuler
                    </Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
