"use client";

import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";
import { Plus } from "lucide-react";
import AddTaxes from "./modals/AddTaxes";

export default function GestionTaxesRightAction() {

    const { openModal } = useModalState();

    const handleClick = () => {
        openModal({ title: "Ajouter une taxe", description: "Ajouter une taxe", component: AddTaxes });
    }

    return (
        <div className="flex justify-end">
            <Button onClick={handleClick}><Plus /> Ajouter une taxe</Button>
        </div>
    );
}