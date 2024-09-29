import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import React from "react";

type AddButtonProps = {
    title?: string;
};
const AddButton = ({ title }: AddButtonProps) => {
    return (
        <div className="flex  justify-end">
            <Button type="button" className="  self-end">
                <Plus className="h-5 w-5  mr-1" /> {title || "Ajouter"}
            </Button>
        </div>
    );
};

export default AddButton;
