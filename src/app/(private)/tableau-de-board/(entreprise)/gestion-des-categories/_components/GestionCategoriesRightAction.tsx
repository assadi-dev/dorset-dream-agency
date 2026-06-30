"use client";

import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";
import { Plus } from "lucide-react";
import AddCategories from "./modals/AddCategories";


export default function GestionCategoriesRightAction() {
    const { openModal } = useModalState();

    const handleClick = () => {
        openModal({ title: "Ajouter une categorie", description: "Ajouter une categorie", component: AddCategories });
    }

    return (
        <div className="flex justify-end">
            <Button onClick={handleClick}><Plus /> Ajouter une categorie</Button>
        </div>
    );
}