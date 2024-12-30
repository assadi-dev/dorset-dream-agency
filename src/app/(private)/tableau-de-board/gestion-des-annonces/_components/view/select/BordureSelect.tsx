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
        if (!selected || !canvas) return;
        const strokeWidth = selected.strokeWidth || 2;
        const stroke = selected.stroke || "black";
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
        switch (value) {
            case "none":
                object.stroke = null;
                object.strokeWidth = 0;
                object.strokeDashArray = [];
                canvas?.renderAll();
                updateObject(object);
                break;
            case "solid":
                object.stroke = stroke;
                object.strokeWidth = strokeWidth;
                object.strokeDashArray = [];
                canvas?.renderAll();
                //const serialize = fabricObjectSerializer(object)
                updateObject(object);
                break;
            case "dashed":
                object.stroke = stroke;
                object.strokeWidth = strokeWidth;
                object.strokeDashArray = [strokeWidth, strokeWidth];
                canvas?.renderAll();
                updateObject(object);
                break;
        }
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
            <Select defaultValue={selected?.strokeStyle || "none"} onValueChange={handleSelectBordure}>
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
            <div className="flex gap-5 items-center justify-center">
                <ColorPickerInput onChange={handleChangeStrokeColor} />
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
        </div>
    );
};

export default BordureSelect;
