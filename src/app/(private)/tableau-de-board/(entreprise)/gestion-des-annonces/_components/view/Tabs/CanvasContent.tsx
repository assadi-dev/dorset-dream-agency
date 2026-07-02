import React from "react";
import BackgroundElements from "../../BackgroundElements";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPickerInput from "../../ColorPicker";
import useFabricAction from "../../fabric/useFabric";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

const CanvasContent = () => {
    const { canvas, setCanvasBackgroundColor, addObjectToLayer } = useFabricAction();
    const handleChangeCanvasColor = (value: any) => {
        if (!canvas) return;
        setCanvasBackgroundColor(value);
    };
    return (
        <div className="h-full w-full flex flex-col gap-5">
            <CardTitle>Canvas</CardTitle>
            <ScrollArea className="h-[40vh] w-full py-3 ">
                <BackgroundElements />
            </ScrollArea>
            <div className="mt-2">
                <div className="p-1 w-full grid grid-cols-2 gap-2 ">
                    <div>
                        <Label>Largeur</Label>
                        <Input type="number" min={1} defaultValue={canvas?.width} disabled />
                    </div>
                    <div>
                        <Label>Hauteur</Label>
                        <Input type="number" min={1} defaultValue={canvas?.height} disabled />
                    </div>
                </div>
                <div>
                    <Label>Couleur</Label>
                    <ColorPickerInput onChange={handleChangeCanvasColor} />
                </div>
                <div>
                    <Label>Zoom</Label>
                    <Slider defaultValue={[100]} max={200} min={10} />
                </div>
            </div>
        </div>
    );
};

export default CanvasContent;
