import Image from "next/image";
import React from "react";
import ActionPhoto from "./ActionPhoto";
import { cn } from "@/lib/utils";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/corners.css";

import EditGroupButton from "./EditGroupButton";

type PreviewDropzoneProps = {
    src?: string | null;
    alt?: string;
    onRemove?: () => void;
};
const PreviewDropzone = ({ src, alt }: PreviewDropzoneProps) => {
    const cropperRef = React.useRef<CropperRef>(null);

    const fadeIn = !src ? "h-0 opacity-0 " : "lg:h-[48vh]  opacity-1";
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-gradient-to-br to-[#0f172a] from-[#214583] rounded shadow p-2 transition-all duration-500",
                fadeIn,
            )}
        >
            {
                src && (
                    <Cropper
                        ref={cropperRef}
                        stencilProps={{
                            aspectRatio: 1 / 1,
                        }}
                        src={src}
                        className={"cropper lg:p-3"}
                        minHeight={500}
                        minWidth={500}
                    />
                )
                /*      <Image
                    src={src || ""}
                    alt={alt || `Photo de l'employee`}
                    height={500}
                    width={500}
                    className="position-center object-contain  w-full bg-transparent h-full"
                /> */
            }
            {cropperRef.current && <EditGroupButton cropperRef={cropperRef.current} />}
        </div>
    );
};

export default PreviewDropzone;
