"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type SelectRoleComboboxProps = {
    roles: { id?: number; label: string; value: string; description?: string | null }[];
};
const SelectRoleCombobox = ({ roles }: SelectRoleComboboxProps) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {value ? roles.find((role) => role.value === value)?.label : "Sélectionner un rôle"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" style={{ width: "var(--radix-popover-trigger-width)" }}>
                <Command>
                    <CommandInput placeholder="Rechercher un rôle" className="h-9" />
                    <CommandList>
                        <CommandEmpty>Aucun rôle</CommandEmpty>
                        <CommandGroup>
                            {roles.map((role) => (
                                <CommandItem
                                    key={role.value}
                                    value={role.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <div className="w-full">
                                        <p> {role.label}</p>
                                    </div>
                                    <Check
                                        className={cn("ml-auto", value === role.value ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectRoleCombobox;
