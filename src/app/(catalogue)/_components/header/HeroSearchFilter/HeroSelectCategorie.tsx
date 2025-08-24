"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";

export type OptionsType = { label: string; value: any };
type HeroSelectCategoriesProps = {
    dispatch: React.Dispatch<any>;
    selected?: string;
};
const HeroSelectCategories = ({ dispatch }: HeroSelectCategoriesProps) => {
    const categoryQuery = useCategoryPropertiesOptions();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<string | null>(null);
    const handleSelect = (currentValue: any) => {
        const selectedValue = currentValue === value ? "" : currentValue;
        setValue(selectedValue);
        dispatch({ category: selectedValue });
        setOpen(false);
    };

    const ENUM_PROPERTY_CATEGORIES = React.useMemo(() => {
        if (categoryQuery.data) return categoryQuery.data;
        return [];
    }, [categoryQuery.data]);

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
                        ENUM_PROPERTY_CATEGORIES.find(
                            (category: OptionsType) => category.value === value || category.label === value,
                        )?.label
                    ) : (
                        <span className="text-slate-500">Choisissez une catégorie</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {ENUM_PROPERTY_CATEGORIES.map((category: OptionsType) => (
                                <CommandItem key={category.value} value={category.value} onSelect={handleSelect}>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category.value ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                    {category.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default HeroSelectCategories;
