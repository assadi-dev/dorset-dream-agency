import { Button, ButtonProps } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type AddButtonProps = ButtonProps & {
    title?: string;
    href?: string;
};
const AddButton = ({ title, href, ...props }: AddButtonProps) => {
    return (
        <>
            {href ? (
                <Button {...props} asChild size="sm">
                    <Link href={href}>
                        <Plus className="h-5 w-5  mr-1" /> {title || "Ajouter"}
                    </Link>
                </Button>
            ) : (
                <Button size="sm" {...props}>
                    <Plus className="h-5 w-5  mr-1" /> {title || "Ajouter"}
                </Button>
            )}
        </>
    );
};

export default AddButton;
