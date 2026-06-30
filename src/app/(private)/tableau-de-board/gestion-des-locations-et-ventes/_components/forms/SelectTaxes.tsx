"use client";

import React from "react";
import useTaxesOptions from "@/hooks/useTaxesOptions";
import { UseFormReturn } from "react-hook-form";
import { LocationVentesFormType } from "./schema";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const SelectTaxes = ({ form, placeholder, description, onchange, defaultValue }: { form: UseFormReturn<LocationVentesFormType>, placeholder?: string, description?: string, onchange: (value: any) => void, defaultValue?: string }) => {
    const taxOptions = useTaxesOptions();

    const TAX_OPTIONS = React.useMemo(() => {
        if (!taxOptions.data) return [];
        return taxOptions.data.map((tax: any) => ({
            id: String(tax.id),
            label: tax.name,
            value: String(tax.rate),
        }));
    }, [taxOptions.data]);

    return <FormField
        control={form.control}
        name="taxes"
        render={({ field }) => (
            <FormItem>

                <Select onValueChange={(value) => {
                    const selectedTax = TAX_OPTIONS.find((tax) => tax.value === value);
                    onchange(selectedTax);



                }} defaultValue={defaultValue || field.value?.toString() || ""}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} {...field} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {TAX_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value || ""}>
                                {option.label} <span className="text-muted-foreground font-mono"> +{option.value}$</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </Select>
            </FormItem>
        )}
    />
};

export default SelectTaxes;