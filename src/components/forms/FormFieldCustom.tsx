import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    description?: string;
    children: React.ReactNode;
};

const FormFieldCustom = <T extends FieldValues>({ control, name, label, description, children }: FormFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>{children}</FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldCustom;
