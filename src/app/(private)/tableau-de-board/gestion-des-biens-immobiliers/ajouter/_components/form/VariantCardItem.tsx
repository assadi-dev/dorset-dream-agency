import React from "react";
import appartement from "@assets/images/appartement.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";
import { removeVariants } from "./helpers";

type VariantCardItem = React.HTMLAttributes<HTMLElement> & {
    variant: {
        id: number | string;
        name: string;
        files: Array<File>;
    };
};
const VariantCardItem = ({ variant, ...props }: VariantCardItem) => {
    const [previewUrl, setPreviewUrl] = React.useState<string>("");

    const form = useFormContext();

    React.useEffect(() => {
        if (!variant) return;
        const file = variant.files[0];
        if (!file) return;
        const link = URL.createObjectURL(file);

        setPreviewUrl(link);
        return () => {
            URL.revokeObjectURL(link);
        };
    }, [variant]);

    const handleClickRemove = () => {
        const currentVariants = form.getValues("variants");
        const variantsRemoved = removeVariants(currentVariants, [variant.id]);
        form.setValue("variants", variantsRemoved);
    };

    const RemoveButton = () => {
        return (
            <button
                type="button"
                className="flex top-2 right-2 absolute  rounded-full text-white  hover:text-white transition-all active:scale-90"
                onClick={handleClickRemove}
            >
                <CircleX className="w-4 h-4 " />
            </button>
        );
    };

    return (
        <>
            {variant && (
                <figure
                    className={cn(
                        styles["card-variant"],
                        "card-variant h-[130px] relative w-fit overflow-hidden rounded-xl",
                        props.className,
                    )}
                    {...props}
                >
                    <Image
                        width={800}
                        height={800}
                        src={previewUrl}
                        alt={`picture of ${variant.name}`}
                        className="rounded-xl"
                    />
                    <figcaption className={cn(styles["card-variant-legend"], "p-3")}>
                        <RemoveButton />
                        <p className="text-xs font-bold truncate max-w-full">{variant.name}</p>
                    </figcaption>
                </figure>
            )}
        </>
    );
};

export default VariantCardItem;
