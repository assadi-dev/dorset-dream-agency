import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import InputPassword, { InputProps } from "../ui/inputPassword";

type FormFieldInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    description?: string;
    placeholder?: string;
    classNamButton?: string;
    classNameFormItem?: string;
};

type InputFieldProps = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const FormFieldInputPassword = <T extends FieldValues>({
    control,
    name,
    label,
    description,
    placeholder,
    classNamButton,
    classNameFormItem,
    ...props
}: FormFieldInputProps<T> & InputFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={classNameFormItem}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <InputPassword
                            placeholder={placeholder}
                            classNamButton={classNamButton}
                            {...field}
                            {...props}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldInputPassword;
