"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type OptionsType = { label: string; value: any };

const SelectCategory = () => {
    const categoryQuery = useCategoryPropertiesOptions();
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "";
    const pathname = usePathname();
    const router = useRouter();

    const updateRouteParams = React.useCallback(
        (value: string) => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set("category", value);
            const updatePathName = pathname + "?" + updatedSearchParams.toString();
            router.push(updatePathName);
        },
        [pathname, router, searchParams],
    );

    const ENUM_PROPERTY_CATEGORIES = React.useMemo(() => {
        if (categoryQuery.data) return categoryQuery.data;
        return [];
    }, [categoryQuery.data]);

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(category);
    const handleSelect = (currentValue: any) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        updateRouteParams(currentValue);
    };

    return (
        <React.Suspense>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full sm:w-[15vw] justify-between"
                    >
                        {value
                            ? ENUM_PROPERTY_CATEGORIES.find(
                                  (category: OptionsType) => category.value === value || category.label === value,
                              )?.label
                            : "Choisissez une catégorie"}
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
        </React.Suspense>
    );
};

export default SelectCategory;
