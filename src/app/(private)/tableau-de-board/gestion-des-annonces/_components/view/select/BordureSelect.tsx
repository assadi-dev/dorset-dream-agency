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

type BordureSelectProps = {
    object: FabricObjectExtends | null;
};
const BordureSelect = ({ object }: BordureSelectProps) => {
    const { canvas } = useFabricAction();

    const [borderState, setBorderState] = React.useState<{
        stroke: string | null;
        strokeWidth: number;
        selected: string;
    }>({
        stroke: null,
        strokeWidth: object?.strokeWidth || 0,
        selected: BORDER_LIST_TYPE[0].value,
    });

    const handleSelectBordure = (value: string) => {
        if (!object) return;
        const strokeWidth = borderState.strokeWidth || 2;
        const stroke = borderState.stroke || "black";
        switch (value) {
            case "none":
                object.stroke = null;
                object.strokeWidth = 0;
                object.strokeDashArray = [];
                canvas?.renderAll();

                break;
            case "solid":
                object.stroke = stroke;
                object.strokeWidth = strokeWidth;
                object.strokeDashArray = [];
                canvas?.renderAll();
                setBorderState((prev) => ({ ...prev, selected: value, stroke, strokeWidth }));
                break;
            case "dashed":
                object.stroke = stroke;
                object.strokeWidth = strokeWidth;
                object.strokeDashArray = [strokeWidth, strokeWidth];
                canvas?.renderAll();
                break;
        }
    };

    const handleChangeStrokeColor = (value: any) => {
        if (!object) return;
        object.stroke = value;
        canvas?.renderAll();
        setBorderState((prev) => ({ ...prev, stroke: value }));
    };

    const handleChangeStrokeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!object) return;
        object.strokeWidth = value;
        canvas?.renderAll();
        setBorderState((prev) => ({ ...prev, strokeWidth: value }));
    };

    return (
        <div className="my-1 flex flex-col gap-3">
            {borderState.selected !== "none" && <ColorPickerInput onChange={handleChangeStrokeColor} />}
            <Select defaultValue={borderState.selected} onValueChange={handleSelectBordure}>
                <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    {BORDER_LIST_TYPE.map((border) => (
                        <SelectItem key={border.value} value={border.value} className="text-xs">
                            {border.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex gap-5 items-center">
                <ColorPickerInput onChange={() => {}} />
                <div className="flex gap-2 items-center">
                    <StrokeThickness />
                    <Input
                        type="number"
                        placeholder="épaisseur"
                        min={0}
                        value={borderState.strokeWidth}
                        onChange={handleChangeStrokeWidth}
                        name="strokeWidth"
                        className="text-xs w-[65px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default BordureSelect;
