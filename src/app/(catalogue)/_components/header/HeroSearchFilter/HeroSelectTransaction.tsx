"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type OptionsType = { label: string; value: any };
type HeroSelectCategoriesProps = {
    dispatch: React.Dispatch<any>;
    selected?: string;
};

const HeroSelectTransaction = ({ dispatch, selected = "all" }: HeroSelectCategoriesProps) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<string | null>(selected);
    const handleSelect = (currentValue: any) => {
        const selectedValue = currentValue === value ? "" : currentValue;
        setValue(selectedValue);
        dispatch({ transaction: selectedValue });
        setOpen(false);
    };

    const ENUM_PROPERTY_AVAILABLE = [
        { label: "Tout", value: "all" },
        { label: "Oui", value: "yes" },
        { label: "Non", value: "no" },
    ] as OptionsType[];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full lg:w-[full justify-between"
                >
                    {value ? (
                        ENUM_PROPERTY_AVAILABLE.find((v: OptionsType) => v.value === value || v.label === value)?.label
                    ) : (
                        <span className="text-slate-500">Disponibilité</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {ENUM_PROPERTY_AVAILABLE.map((v: OptionsType) => (
                                <CommandItem key={v.value} value={v.value} onSelect={handleSelect}>
                                    <Check
                                        className={cn("mr-2 h-4 w-4", value === v.value ? "opacity-100" : "opacity-0")}
                                    />
                                    {v.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default HeroSelectTransaction;
