import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import React from "react";

const AddButton = () => {
    return (
        <div className="flex  justify-end">
            <Button type="button" className="  self-end">
                <Plus className="h-5 w-5  mr-1" /> Ajouter un employé
            </Button>
        </div>
    );
};

export default AddButton;
