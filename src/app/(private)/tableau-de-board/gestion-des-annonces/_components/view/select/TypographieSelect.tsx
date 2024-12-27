T"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type BorderListType = {
    value: string;
    label: string;
};
const SYSTEM_FONTS: BorderListType[] = [
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'San Francisco (Apple)', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
    { label: 'Segoe UI (Windows)', value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
    { label: 'Roboto (Android)', value: 'Roboto, sans-serif' },
    { label: 'Helvetica Neue (macOS)', value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
    { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
    { label: 'Courier New', value: '"Courier New", Courier, monospace' },
    { label: 'Ubuntu (Linux)', value: 'Ubuntu, sans-serif' },
    { label: 'Cantarell (GNOME)', value: 'Cantarell, sans-serif' },
    { label: 'DejaVu Sans (Linux)', value: '"DejaVu Sans", sans-serif' },
    { label: 'Noto Sans (Global)', value: '"Noto Sans", sans-serif' },
  ];
const TypographieSelect = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(SYSTEM_FONTS[0].value);

    const handleSelect = (currentValue: string) => {
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
                        {value
                            ? SYSTEM_FONTS.find((font) => font.value === value)?.label
                            : "Sélectionner une bordure"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Recherché" className="h-9" />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {SYSTEM_FONTS.map((font) => (
                                    <CommandItem key={font.value} value={font.value} onSelect={handleSelect}>
                                        {font.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === border.value ? "opacity-100" : "opacity-0",
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
