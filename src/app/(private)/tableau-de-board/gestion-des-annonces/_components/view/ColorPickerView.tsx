"use client";
import React from "react";
import ColorPicker, { ColorPickerProps, useColorPicker } from "react-best-gradient-color-picker";

type ColorPickerViewProps = ColorPickerProps;
const ColorPickerView = ({ ...props }: ColorPickerViewProps) => {
    /*   const { getGradientObject } = useColorPicker(color, setColor); */
    const customPresets = [
        "rgba(0,0,0, 0)",
        "rgba(192,192,192, 1)",
        "rgba(255,255,255, 1)",
        "rgba(1, 3, 92, 1)",
        "rgba(0,0,255,1)",
        "rgba(0,255,255, 1)",
        "rgba(0,128,0,1)",
        "rgba(128,128,0, 1)",
        "rgba(0,128,128,1)",
        "rgba(0,255,0, 1)",
        "rgba(128,0,0, 1)",
        "rgba(128,0,128, 1)",
        "rgba(175, 51, 242, 1)",
        "rgba(255,0,255, 1)",
        "rgba(255,0,0, 1)",
        "rgba(240, 103, 46, 1)",
        "rgba(255,255,0, 1)",
    ];
    return <ColorPicker {...props} presets={customPresets} />;
};

export default ColorPickerView;
