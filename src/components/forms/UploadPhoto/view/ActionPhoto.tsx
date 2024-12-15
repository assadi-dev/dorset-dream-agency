import { Button } from "@/components/ui/button";
import { CircleX, ImagePlus, Pencil, Upload } from "lucide-react";
import React from "react";

type ActionPhotoProps = {
    onEdit?: () => void;
    onDelete?: () => void;
};
const ActionPhoto = ({ onEdit, onDelete }: ActionPhotoProps) => {
    return (
        <div className="group-hover:opacity-0 rounded-lg border border-white/50  bg-[#0f172a]/25  flex justify-end gap-2 items-center w-[90%] mx-auto p-1 absolute bottom-1.5    backdrop-blur-xl ">
            <div className="w-[65%] px-2 overflow-hidden">
                <p className="font-semibold text-xs truncate drop-shadow-md text-white">Ma Photo</p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="text-white  border border-cyan-300 bg-cyan-500/35 backdrop-blur-sm hover:bg-cyan-400 hover:border-0"
                onClick={onEdit}
            >
                <Pencil className="h-8 w-8" />
            </Button>
            <Button
                variant="destructive"
                size="icon"
                className="text-white bg-red-600/35 backdrop-blur-xl border border-red-500"
                onClick={onDelete}
            >
                <CircleX className="h-8 w-8" />
            </Button>
        </div>
    );
};

export default ActionPhoto;
