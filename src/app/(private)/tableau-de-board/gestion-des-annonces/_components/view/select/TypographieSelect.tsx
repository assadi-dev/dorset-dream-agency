"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FabricObjectExtends, FabricObjectSelected } from "../../../type";
import { IText, Textbox } from "fabric";
import useFabricAction from "../../fabric/useFabric";
import { getActiveObjectFromLayers } from "../../fabric/helpers";

type BorderListType = {
    value: string;
    label: string;
};
const SYSTEM_FONTS: BorderListType[] = [
    { label: "Anton", value: `Anton` },
    { label: "Archivo Black", value: `Archivo Black` },
    { label: "Arial", value: "Arial" },
    { label: "Cinzel Decorative", value: `Cinzel Decorative` },
    { label: "Roboto", value: `Roboto` },
    { label: "Noto Sans", value: `Noto Sans` },
    { label: "Montserrat", value: `Montserrat` },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Monsieur La Doulaise", value: `Monsieur La Doulaise` },
    { label: "Poppins", value: `Poppins` },
    { label: "Raleway", value: `Raleway` },
];

const TypographieSelect = () => {
    const { canvas, selected, updateObject } = useFabricAction();
    const [open, setOpen] = React.useState(false);

    const fabricObjectText = selected && (selected as FabricObjectSelected);

    const handleSelect = (currentValue: string) => {
        if (!canvas || !selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (!object) return;
        if (object instanceof IText || object instanceof Textbox) {
            const textObject = object;
            textObject.set({
                fontFamily: currentValue,
            });

            object.setCoords();
            canvas?.requestRenderAll();
            updateObject(object);
        }

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
                        className="w-full justify-between text-xs"
                    >
                        {fabricObjectText?.fontFamily
                            ? SYSTEM_FONTS.find((font) => font.value === fabricObjectText.fontFamily)?.label
                            : "Sélectionner une typo"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Recherché une police" className="h-9" />
                        <CommandList>
                            <CommandEmpty>Police introuvable.</CommandEmpty>
                            <CommandGroup>
                                {SYSTEM_FONTS.map((font) => (
                                    <CommandItem key={font.value} value={font.value} onSelect={handleSelect}>
                                        {font.label}
                                        <Check
                                            className={cn(
                                                "ml-auto w-4",
                                                fabricObjectText?.fontFamily === font.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
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
