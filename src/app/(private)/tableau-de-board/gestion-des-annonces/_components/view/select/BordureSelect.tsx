"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FabricObjectExtends } from "../../../type";
import useFabricAction from "../../fabric/useFabric";
import ColorPickerInput from "../../ColorPicker";
import { Input } from "@/components/ui/input";
import { StrokeThickness } from "./StokeIconeWidth";
import { fabricObjectSerializer, getActiveObjectFromLayers } from "../../fabric/helpers";
import { FabricObject } from "fabric";

type BorderListType = {
    value: string;
    label: string;
};
const BORDER_LIST_TYPE: BorderListType[] = [
    {
        value: "none",
        label: "Aucun",
    },
    {
        value: "solid",
        label: "Linéaire",
    },
    {
        value: "dashed",
        label: "Pointillé",
    },
];

const BordureSelect = () => {
    const { canvas, selected, updateLayers, updateObject } = useFabricAction();
    /* 
    const [borderState, setBorderState] = React.useState<{
        stroke: string | null;
        strokeWidth: number;
        selected: string;
    }>({
        stroke: selected?.strokeStyle || null,
        strokeWidth: selected?.strokeWidth || 0,
        selected: BORDER_LIST_TYPE[0].value,
    });
 */
    const handleSelectBordure = (value: string) => {
        if (!canvas) return;
        const object = canvas.getActiveObject() as FabricObject;
        if (!object) return;
        const strokeWidth = object.strokeWidth || 2;
        const stroke = object.stroke || "black";

        if (!object) return;
        switch (value) {
            case "none":
                object.set({
                    stroke: null,
                    strokeStyle: value,
                    strokeWidth: 0,
                    strokeDashArray: [],
                });
                canvas?.renderAll();

                break;
            case "solid":
                object.set({
                    stroke,
                    strokeStyle: value,
                    strokeWidth,
                    strokeDashArray: [],
                });
                canvas?.renderAll();

                break;
            case "dashed":
                object.set({
                    stroke,
                    strokeStyle: value,
                    strokeWidth,
                    strokeDashArray: [strokeWidth, strokeWidth],
                });
                canvas?.renderAll();

                break;
        }
        updateObject(object);
    };

    const handleChangeStrokeColor = (value: any) => {
        if (!selected || !canvas) return;
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
        object.stroke = value;
        canvas?.renderAll();
        updateObject(object);
    };

    const handleChangeStrokeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selected || !canvas) return;
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
        const value = Number(e.target.value);
        if (!object) return;
        object.strokeWidth = value;
        canvas?.renderAll();
        updateObject(object);
    };

    return (
        <div className="my-1 flex flex-col gap-3">
            <Select value={selected?.strokeStyle || "none"} onValueChange={handleSelectBordure}>
                <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Sélectionner un type de bordure" />
                </SelectTrigger>
                <SelectContent>
                    {BORDER_LIST_TYPE.map((border) => (
                        <SelectItem key={border.value} value={border.value} className="text-xs">
                            {border.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selected?.strokeStyle !== "none" && (
                <div className="flex gap-5 items-center justify-center">
                    <ColorPickerInput defaultColor={selected?.stroke as string} onChange={handleChangeStrokeColor} />
                    <div className="flex gap-2 items-center">
                        <StrokeThickness />
                        <Input
                            type="number"
                            placeholder="épaisseur"
                            min={0}
                            value={selected?.strokeWidth}
                            onChange={handleChangeStrokeWidth}
                            name="strokeWidth"
                            className="text-xs w-[75px]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BordureSelect;
