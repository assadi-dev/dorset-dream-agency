import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

const Skeleton = () => {
    return (
        <div
            className={cn(
                styles.skeleton,
                "w-full h-[200px] bg-gray-200 rounded-lg relative overflow-hidden shadow-xl ",
            )}
        >
            <div
                className={cn(
                    styles["skeleton-glow"],
                    "absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200",
                )}
            ></div>
        </div>
    );
};

export default Skeleton;
