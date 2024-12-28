import React from "react";
import ColorPickerInput from "../../ColorPicker";
import TypographieSelect from "../select/TypographieSelect";
import { Input } from "@/components/ui/input";
import { RadixIconsFontSize, TextLineHeight } from "./FontSizeIcon";
import { Droplet } from "lucide-react";

const TextSizeAndColor = () => {
    const handleChangeFontSize = () => {};
    const handleChangeTextColor = () => {};
    return (
        <div className="flex flex-col gap-3 my-3">
            <TypographieSelect object={null} />
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                    <Droplet className="w-5" /> <ColorPickerInput onChange={handleChangeTextColor} />
                </div>
                <div className="flex items-center gap-3">
                    <RadixIconsFontSize className="w-6 h-6" />
                    <Input
                        type="number"
                        defaultValue="18"
                        onChange={handleChangeFontSize}
                        className="text-xs w-[75px] "
                    />
                </div>
                <div className="flex items-center gap-3">
                    <TextLineHeight className="w-6 h-6" />
                    <Input
                        type="number"
                        defaultValue="18"
                        onChange={handleChangeFontSize}
                        className="text-xs w-[75px] "
                    />
                </div>
            </div>
        </div>
    );
};

export default TextSizeAndColor;
