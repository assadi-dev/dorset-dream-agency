import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { STOCKAGE_RADIO_LIST } from "./helpers";
import { cn, generate_slug } from "@/lib/utils";
import { FormLabel } from "@/components/ui/form";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { useFormContext } from "react-hook-form";
import { propertyFormType } from "./propertySchema";

type StockChoiceProps = {
    label?: string;
    className?: string;
};
const StockChoice = ({ label, className }: StockChoiceProps) => {
    const { getValues, setValue, control } = useFormContext<propertyFormType>();
    const [stock] = React.useState<number>(getValues("stock") as number);
    const [choice, setChoice] = React.useState<number>(getValues("typeStock") as number);

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setValue("typeStock", value);
        setChoice(value);
    };

    return (
        <div className={cn("rounded-lg ", className)}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                name="choice"
                defaultValue={String(choice)}
                className="flex gap-3 items-center p-3"
                onChange={handleSelect}
            >
                {STOCKAGE_RADIO_LIST.map((item, index) => {
                    const labelKey = generate_slug(item.label);
                    return (
                        <div key={item.label} className="flex items-center space-x-2">
                            <RadioGroupItem value={String(item.value)} id={labelKey} className="shadow-xl" />
                            <FormLabel htmlFor={labelKey}>{item.label}</FormLabel>
                        </div>
                    );
                })}
            </RadioGroup>
            <div className="h-16 transition-all">
                {choice > 0 && (
                    <FormFieldInput control={control} name="stock" type="number" className="w-full lg:w-1/2" />
                )}
            </div>
        </div>
    );
};

export default StockChoice;
