import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import Link from "next/link";
import React from "react";

type AddButtonProps = {
    title?: string;
    href?: string;
};
const AddButton = ({ title, href }: AddButtonProps) => {
    return (
        <div className="flex  justify-end">
            {href ? (
                <Button className="  self-end" asChild>
                    <Link href={href}>
                        {" "}
                        <Plus className="h-5 w-5  mr-1" /> {title || "Ajouter"}
                    </Link>
                </Button>
            ) : (
                <Button type="button" className="  self-end">
                    <Plus className="h-5 w-5  mr-1" /> {title || "Ajouter"}
                </Button>
            )}
        </div>
    );
};

export default AddButton;
