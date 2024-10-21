import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";

type FormFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
};

/**
 * Le HOC qui permet de personnaliser le champ d'entrée
 */
function withFormField<T extends FieldValues>(
    InputComponent: React.ComponentType<any>, // Composant personnalisé injecté
) {
    return function FormFieldCustom({ control, name, label, placeholder, description }: FormFieldProps<T>) {
        return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            {/* Composant d'entrée personnalisé injecté */}
                            <InputComponent placeholder={placeholder} {...field} />
                        </FormControl>
                        {<FormDescription>{description}</FormDescription>}
                        {<FormMessage />}
                    </FormItem>
                )}
            />
        );
    };
}

export default withFormField;
