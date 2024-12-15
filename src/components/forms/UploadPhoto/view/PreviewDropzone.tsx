import Image from "next/image";
import React from "react";
import ActionPhoto from "./ActionPhoto";
import { cn } from "@/lib/utils";

type PreviewDropzoneProps = {
    src?: string | null;
    alt?: string;
    onRemove?: () => void;
};
const PreviewDropzone = ({ src, alt }: PreviewDropzoneProps) => {
    const fadeIn = !src ? "h-0 opacity-0 " : "lg:h-[48vh]  opacity-1";
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-gradient-to-br to-[#0f172a] from-[#214583] rounded shadow p-2 transition-all duration-500",
                fadeIn,
            )}
        >
            {src && (
                <Image
                    src={src || ""}
                    alt={alt || `Photo de l'employee`}
                    height={500}
                    width={500}
                    className="position-center object-contain  w-full bg-transparent h-full"
                />
            )}
        </div>
    );
};

export default PreviewDropzone;
