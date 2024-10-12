import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePlus, PlusCircle } from "lucide-react";
import React from "react";
import VariantCardItem from "./VariantCardItem";
import { array } from "zod";
import { arrayFill } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const FormVariantProperty = () => {
    const fillArray = arrayFill(10);
    const form = useFormContext();
    const variants = form.getValues("variants");
    console.log(variants);

    return (
        <ScrollArea className="p-3 lg:h-[calc(55vh-50px)]">
            <div className="w-full  grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(150px,250px))] gap-3">
                {variants.map((variant) => (
                    <VariantCardItem variant={variant} key={variant.id} />
                ))}
            </div>
            <div></div>
        </ScrollArea>
    );
};

export default FormVariantProperty;
