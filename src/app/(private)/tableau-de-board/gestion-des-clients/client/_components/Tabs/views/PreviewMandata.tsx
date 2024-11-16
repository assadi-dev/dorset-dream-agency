import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import { WarrantFormType } from "./schema";

type PreviewMandatProps = {
    warrantFile?: { id?: number | string; name?: string; file?: File };
};
const PreviewMandata = ({ warrantFile }: PreviewMandatProps) => {
    const { getValues, setValue } = useFormContext<WarrantFormType>();
    const [src, setSrc] = React.useState<string>("");

    React.useEffect(() => {
        if (!warrantFile?.file) return;
        if (!src) setSrc(URL.createObjectURL(warrantFile.file));

        return () => {
            if (src) URL.revokeObjectURL(src);
        };
    }, [warrantFile?.file, src]);

    const onRemoveAction = () => {
        if (!warrantFile) return;
        const updateCollection = getValues("warrantFiles").filter((v) => v.id != warrantFile.id);
        setValue("warrantFiles", updateCollection);
    };

    return (
        <figure className=" bg-background  rounded-lg flex flex-col justify-between gap-1 p-1 hover:shadow-lg transition-all">
            <div className={`rounded-lg h-[140px] w-full overflow-hidden flex items-center relative `}>
                {src && (
                    <Image fill src={src} alt={`preview picture file ${warrantFile?.name}`} className="object-center" />
                )}
            </div>

            <figcaption
                className={cn(
                    "flex justify-between  items-center text-black px-3 py-2 ring-1 ring-slate-300 bg-slate-200 rounded-md",
                )}
            >
                {" "}
                <p className="text-xs font-bold truncate w-[95%]">{warrantFile?.name}</p>
                <div className="flex justify-end items-center gap-1.5">
                    <button
                        type="button"
                        className="grid place-items-center rounded-full h-5 w-5 ring-1  bg-destructive/25 ring-destructive text-destructive transition-all hover:bg-destructive hover:text-white active:scale-90"
                        onClick={onRemoveAction}
                    >
                        <Trash2 className="w-2.5 h-2.5 " />
                    </button>
                </div>
            </figcaption>
        </figure>
    );
};

export default PreviewMandata;
