"use client";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Button } from "@/components/ui/button";
import { ImageDown, Save } from "lucide-react";

const ExportContent = () => {
    const { canvas } = useFabricAction();
    const exportToPng = React.useCallback(async () => {
        if (!canvas) return;
        const png = canvas.toDataURL();
    }, [canvas]);
    return (
        <div className="flex flex-col gap-2  h-full  text-sm w-fit bg-white p-5 rounded-xl shadow-lg">
            <Button type="button" onClick={exportToPng}>
                Export to PNG
            </Button>
        </div>
    );
};

export default ExportContent;
