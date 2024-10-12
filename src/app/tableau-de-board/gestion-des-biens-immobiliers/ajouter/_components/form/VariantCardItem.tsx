import React from "react";
import appartement from "@assets/images/appartement.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import styles from "./styles.module.css";

const VariantCardItem = ({ ...props }) => {
    const RemoveButton = () => {
        return (
            <button
                type="button"
                className="flex top-2 right-2 absolute  rounded-full text-white  hover:text-white transition-all active:scale-90"
            >
                <CircleX className="w-4 h-4 " />
            </button>
        );
    };

    return (
        <figure
            className={cn(
                styles["card-variant"],
                "card-variant h-[130px] relative w-fit overflow-hidden rounded-xl",
                props.className,
            )}
            {...props}
        >
            <Image src={appartement} alt="image appartement" placeholder="blur" className="rounded-xl" />
            <figcaption className={cn(styles["card-variant-legend"], "p-3")}>
                <RemoveButton />
                <p className="text-xs font-bold truncate max-w-full">Appartement Appartement Appartement Appartement</p>
            </figcaption>
        </figure>
    );
};

export default VariantCardItem;
