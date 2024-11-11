import React from "react";
import appartement from "@assets/images/appartement.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleX, Pen, PenLine, Trash, Trash2 } from "lucide-react";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";
import { removeVariants } from "./helpers";
import { Button } from "@/components/ui/button";
import TooltipCustomProvider from "@/components/providers/TooltipCustomProvider";
import useModalState from "@/hooks/useModalState";
import { EditButton, RemoveButton } from "./VaraintCarAction";
import { FileObj } from "../../../types";

type VariantCardItemProps = React.HTMLAttributes<HTMLElement> & {
    previewLink?: string | null;
    variant: {
        id: number | string;
        name: string;
        files: Array<FileObj>;
    };
};
const VariantCardItem = ({ variant, previewLink, ...props }: VariantCardItemProps) => {
    const [previewUrl, setPreviewUrl] = React.useState<string>("");

    const form = useFormContext();

    React.useEffect(() => {
        if (!variant) return;
        if (variant.files) {
            const file = variant.files[0].file;
            if (file instanceof File && !previewUrl) {
                const link = URL.createObjectURL(file);
                setPreviewUrl(link);
            }
        }

        return () => {
            previewUrl && URL.revokeObjectURL(previewUrl);
        };
    }, [variant, previewUrl]);

    React.useEffect(() => {
        if (previewLink) setPreviewUrl(previewLink);
        //TODO Penser a revoke les url avant la mort du composant
    }, [previewLink]);

    const handleClickRemove = React.useCallback(() => {
        //TODO Faire l'appel api ici pour supprimer la variant du serveur
        if (previewLink && typeof variant.id === "number") console.log("delete variante api");

        if (form) {
            const currentVariants = form.getValues("variants");
            const variantsRemoved = removeVariants(currentVariants, [variant.id]);
            form.setValue("variants", variantsRemoved);
        }
    }, [previewLink, variant.id, form]);

    return (
        <>
            {variant && (
                <figure
                    className={cn(
                        styles["card-variant"],
                        "flex flex-col justify-between gap-1 p-1 h-[182px] relative w-[255px] overflow-hidden rounded-md",
                        props.className,
                    )}
                    {...props}
                >
                    <div className="relative rounded-md h-[132px] overflow-hidden">
                        <Image
                            width={800}
                            height={800}
                            src={previewUrl}
                            alt={`picture of ${variant.name}`}
                            className=" w-full h-full object-cover"
                        />
                    </div>
                    <figcaption
                        className={cn(
                            "flex justify-between  items-center text-black px-3 py-2 ring-1 ring-slate-300 bg-slate-200 rounded-md",
                        )}
                    >
                        <p className="text-xs font-bold truncate w-[95%]">{variant.name}</p>
                        <div className="flex justify-end items-center gap-1.5">
                            <EditButton payload={variant} />
                            <RemoveButton onRemoveAction={handleClickRemove} />
                        </div>
                    </figcaption>
                </figure>
            )}
        </>
    );
};

export default VariantCardItem;
