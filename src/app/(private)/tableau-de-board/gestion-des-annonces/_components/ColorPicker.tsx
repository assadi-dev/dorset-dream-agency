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
    const previewColorRef = React.useRef<HTMLButtonElement | null>(null);
    const sizes = {
        height: 50,
        width: 50,
    };
    const styles = {
        height: sizes.height,
        width: sizes.width,
        background: defaultColor,
    };
    const handChangeColor = (value: string) => {
        onChange && onChange(value);
        if (previewColorRef.current) {
            const style = `width:${sizes.width}px;height:${sizes.height}px;background:${value}`;
            previewColorRef.current?.setAttribute("style", style);
        }
    };

    return (
        <div className="relative bg-transparent">
            <Popover>
                <PopoverTrigger asChild>
                    <button ref={previewColorRef} style={styles} className={`shadow rounded`}></button>
                </PopoverTrigger>
                <PopoverContent className="w-fit bg-[rgb(34,34,34)] border-0">
                    <ColorPickerView onChange={handChangeColor} />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ColorPickerInput;
