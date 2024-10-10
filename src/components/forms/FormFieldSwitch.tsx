import React from "react";

import { FormItem, FormLabel, FormControl, FormDescription, FormField } from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

const FormFieldSwitch = ({ control, label, description, className }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border p-4", className)}>
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">{label}</FormLabel>
                        <FormDescription>{description}</FormDescription>
                    </div>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default FormFieldSwitch;
