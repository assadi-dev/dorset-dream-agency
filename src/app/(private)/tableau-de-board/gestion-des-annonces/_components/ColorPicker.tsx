"use client";
import useModalState from "@/hooks/useModalState";
import React from "react";

import ColorPickerView from "./view/ColorPickerView";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ColorPickerInputProps = {
    defaultColor?: string;
    onChange: (value: any) => void;
};
const ColorPickerInput = ({ defaultColor = "#ffffff", onChange }: ColorPickerInputProps) => {
    const [color, setColor] = React.useState(defaultColor);
    const previewColorRef = React.useRef<HTMLButtonElement | null>(null);
    const sizes = {
        height: 30,
        width: 35,
    };
    const styles = {
        height: sizes.height,
        width: sizes.width,
        background: color,
    };
    const handChangeColor = (value: string) => {
        setColor((current) => {
            current = value;
            onChange && onChange(current);
            return current;
        });
    };

    return (
        <div className="relative bg-transparent flex items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <button ref={previewColorRef} style={styles} className={`shadow rounded`}></button>
                </PopoverTrigger>
                <PopoverContent className="w-fit bg-[rgb(34,34,34)] border-0">
                    <ColorPickerView value={color} onChange={handChangeColor} />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ColorPickerInput;
