import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { NAMES_OPTIONS } from "../../helper";
import { Nullable } from "react-advanced-cropper";

type SelectNameProps = {
    value: string;
    onChange: (value: string) => void;
};
const SelectName = ({ value, onChange }: SelectNameProps) => {
    return (
        <Select name="name" value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue id="name" />
            </SelectTrigger>
            <SelectContent>
                {NAMES_OPTIONS.map((n) => (
                    <SelectItem key={n.id} value={n.value}>
                        {n.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectName;
