import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { LucideProps } from "lucide-react";
import React from "react";

export type ActionControl = {
    canCreate?: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canChangePassword?: boolean;
};

export enum UserActionEnum {
    create = "Création",
    update = "Modification",
    delete = "Surpression",
    restore = "Restoration",
}

export type UserActionUnion = "create" | "update" | "delete" | "restore";

export type LucidIconProps = React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
