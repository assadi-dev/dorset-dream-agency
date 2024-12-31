import React from "react";
import ColorPickerInput from "../../ColorPicker";
import TypographieSelect from "../select/TypographieSelect";
import { Input } from "@/components/ui/input";
import { RadixIconsFontSize, TextLineHeight } from "./FontSizeIcon";
import { Droplet } from "lucide-react";
import useFabricAction from "../../fabric/useFabric";
import { FabricObjectSelected } from "../../../type";
import { getActiveObjectFromLayers } from "../../fabric/helpers";
import { IText, Textbox } from "fabric";

const TextSizeAndColor = () => {
    const { canvas, selected, updateObject } = useFabricAction();

    const fabricObjectText = selected && (selected as FabricObjectSelected);
    const handleChangeFont = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!canvas) return;
        if (!selected?.id) return;
        const value = Number(event.currentTarget.value);
        const name = event.currentTarget.name;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (object instanceof IText || object instanceof Textbox) {
            object.set(name, value);
            object.exitEditing();
            object.setCoords();
            canvas.renderAll();
            updateObject(object);
        }
    };
    const handleChangeTextColor = (value: string) => {
        if (!canvas) return;
        if (!selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (!object) return;
        object.set("fill", value);
        canvas.requestRenderAll();
        updateObject(object);
    };

    return (
        <div className="flex flex-col gap-3 my-3">
            <TypographieSelect />
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                    <Droplet className="w-5" />{" "}
                    <ColorPickerInput
                        defaultColor={fabricObjectText?.fill as string}
                        onChange={handleChangeTextColor}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <RadixIconsFontSize className="w-6 h-6" />
                    <Input
                        name="fontSize"
                        type="number"
                        defaultValue={fabricObjectText?.fontSize}
                        onChange={handleChangeFont}
                        className="text-xs w-[75px] "
                    />
                </div>
                <div className="flex items-center gap-3">
                    <TextLineHeight className="w-6 h-6" />
                    <Input
                        name="lineHeight"
                        type="number"
                        step={0.16}
                        defaultValue={fabricObjectText?.lineHeight}
                        className="text-xs w-[75px]"
                        onChange={handleChangeFont}
                    />
                </div>
            </div>
        </div>
    );
};

export default TextSizeAndColor;
