import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import InputPassword from "../ui/inputPassword";

type FormFieldInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    description?: string;
    placeholder?: string;
};

const FormFieldInputPassword = <T extends FieldValues>({
    control,
    name,
    label,
    description,
    placeholder,
}: FormFieldInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <InputPassword placeholder={placeholder} {...field} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldInputPassword;
