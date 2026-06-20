"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GestionCategoriesRightAction() {
    return (
        <div className="flex justify-end">
            <Button><Plus /> Ajouter une categorie</Button>
        </div>
    );
}