"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FabricObjectExtends } from "../../../type";
import { IText } from "fabric";
import useFabricAction from "../../fabric/useFabric";

type BorderListType = {
    value: string;
    label: string;
};
const SYSTEM_FONTS: BorderListType[] = [
    { label: "Anton", value: `"Anton", serif` },
    { label: "Archivo Black", value: `"Archivo Black", serif` },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Cinzel Decorative", value: `"Cinzel Decorative", serif` },
    { label: "Roboto", value: `"Roboto", sans-serif` },
    { label: "Noto Sans", value: `"Noto Sans", serif` },
    { label: "Montserrat", value: `"Montserrat", sans-serif` },
    { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
    { label: "Courier New", value: '"Courier New", Courier, monospace' },
    { label: "Monsieur La Doulaise", value: `"Monsieur La Doulaise", serif` },
    { label: "Poppins", value: `"Poppins", sans-serif` },
    { label: "Raleway", value: `"Raleway", sans-serif` },
];

type TypographieSelectProps = {
    object: FabricObjectExtends | null;
};
const TypographieSelect = ({ object }: TypographieSelectProps) => {
    const { canvas } = useFabricAction();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(SYSTEM_FONTS[0].value);

    const handleSelect = (currentValue: string) => {
        if (object && object.type.includes("text")) {
            const textObject = object as IText;
            textObject.fontFamily = currentValue;
            canvas?.requestRenderAll();
        }
        setValue(currentValue);
        setOpen(false);
    };

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between text-xs"
                    >
                        {value ? SYSTEM_FONTS.find((font) => font.value === value)?.label : "Sélectionner une typo"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Recherché une typo" className="h-9" />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {SYSTEM_FONTS.map((font) => (
                                    <CommandItem key={font.value} value={font.value} onSelect={handleSelect}>
                                        {font.label}
                                        <Check
                                            className={cn(
                                                "ml-auto w-4",
                                                value === font.value ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default TypographieSelect;
