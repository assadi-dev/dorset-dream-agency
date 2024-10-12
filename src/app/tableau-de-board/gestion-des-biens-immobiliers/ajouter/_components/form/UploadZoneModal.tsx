"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { arrayFill } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const UploadZoneModal = () => {
    const submitVariant = async () => {
        // TODO: implement the logic to upload the file
    };
    const form = useForm({
        defaultValues: {
            name: "",
            files: [],
        },
    });

    const array = arrayFill(15);

    return (
        <Form {...form}>
            <FormFieldInput
                control={form.control}
                name="name"
                label="Nom"
                placeholder="Ex: Aqua Turquoise,Aqua Violet"
            />

            <form onSubmit={submitVariant} className="w-[32vw] p-3 min-h-[25vh] flex flex-col justify-between gap-3">
                <div className="border border-primary border-dashed rounded-xl h-[16vh] grid place-items-center mb-3">
                    <ImagePlus />
                </div>
                <ScrollArea className="mt-4 h-[25vh] bg-slate-100 rounded-xl pb-3">
                    <div className="p-3 grid grid-cols-[repeat(auto-fit,minmax(100px,135px))] gap-1 justify-center">
                        {array.map((v) => (
                            <div key={v} className="bg-red-500 w-full h-[80px] rounded"></div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="mt-8 flex justify-center">
                    <Button>Ajouter</Button>
                </div>
            </form>
        </Form>
    );
};

export default UploadZoneModal;
