"use client";
import AddForm from "@/app/tableau-de-board/gestion-des-clients/_components/forms/AddForm";
import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";
import { Plus, User } from "lucide-react";
import Link from "next/link";
import React from "react";

type AddButtonProps = {
    title?: string;
    href?: string;
};
const AddButton = ({ title, href }: AddButtonProps) => {
    const { toggleModal } = useModalState();

    const handleClickAddBtn = () => {
        toggleModal({ title: "Ajouter un client", component: AddForm });
    };

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
                <Button type="button" className="  self-end" onClick={handleClickAddBtn}>
                    <Plus className="h-5 w-5  mr-1" /> {title || "Ajouter"}
                </Button>
            )}
        </div>
    );
};

export default AddButton;
