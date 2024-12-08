"use client";
import React from "react";
import ColorPicker, { ColorPickerProps, useColorPicker } from "react-best-gradient-color-picker";

type ColorPickerViewProps = ColorPickerProps;
const ColorPickerView = ({ ...props }: ColorPickerViewProps) => {
    /*   const { getGradientObject } = useColorPicker(color, setColor); */
    return <ColorPicker {...props} />;
};

export default ColorPickerView;
