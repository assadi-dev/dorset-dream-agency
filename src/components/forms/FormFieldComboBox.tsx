import React from "react";
import { Control, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

//type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;
type FormFieldComboBoxProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    control: Control<T>;
    name: Path<T>;
    label?: string;
    description?: string;
    placeholder?: string;
    classNameItems?: string;
    options?: Array<Record<string, any>>;
    emptyMessage?: string;
    classNameButton?: string;
    classNameListOptions?: string;
};
const FormFieldComboBox = <T extends FieldValues>({
    form,
    control,
    name,
    label,
    description,
    placeholder,
    classNameItems,
    classNameButton,
    options,
    emptyMessage,
    classNameListOptions,
    ...props
}: FormFieldComboBoxProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-col", classNameItems)}>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground",
                                        classNameButton,
                                    )}
                                >
                                    {field.value && options
                                        ? options.find((option) => option.value === field.value)?.label
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className={cn("w-[200px] p-0", classNameListOptions)}>
                            <Command>
                                <CommandInput placeholder={placeholder} />
                                <CommandList>
                                    <CommandEmpty>{emptyMessage || "No entries"}</CommandEmpty>
                                    <CommandGroup>
                                        {options?.map((option) => (
                                            <CommandItem
                                                value={option.label}
                                                key={option.value}
                                                onSelect={() => {
                                                    form.setValue(name, option.value);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        option.value === field.value ? "opacity-100" : "opacity-0",
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldComboBox;
