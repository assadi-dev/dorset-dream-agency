"use client";
import useModalState from "@/hooks/useModalState";
import React from "react";

import ColorPickerView from "./view/ColorPickerView";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ColorPickerInput = () => {
    const [color, setColor] = React.useState("rgba(255,255,255,1)");

    return (
        <div className="relative bg-transparent">
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        style={{
                            width: 50,
                            height: 50,
                            background: color,
                        }}
                        className="shadow rounded"
                    ></button>
                </PopoverTrigger>
                <PopoverContent className="w-fit bg-[rgb(34,34,34)] border-0">
                    <ColorPickerView value={color} onChange={setColor} />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ColorPickerInput;
