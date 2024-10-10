"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import AddForm from "./AddForm";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/forms/SubmitButton";

const AddProperty = () => {
    const handleSubmitProperty = async () => {};

    const [isPending, startTransition] = React.useTransition();
    const form = useForm({
        defaultValues: {
            keyQuantity: 1,
        },
    });

    const processing = () => {};
    const SUBMIT_BUTTON = isPending ? "Enregistrement en cours..." : "Enregistrer";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(processing)}>
                <div className="lg:grid lg:grid-cols-[1fr,0.65fr] h-[calc(95vh-200px)] pt-3 gap-3">
                    <ScrollArea className=" w-full  lg:w-[75%] p-3 lg:p-8">
                        <AddForm form={form} />
                    </ScrollArea>
                    <div>
                        <div className="flex justify-end">
                            <SubmitButton isLoading={isPending}>{SUBMIT_BUTTON}</SubmitButton>
                        </div>
                        <ScrollArea className="p-3 h-[calc(90vh-200px)] overflow-y-auto overflow-x-hidden ">
                            <div className="h-full  bg-foreground rounded-xl "></div>
                        </ScrollArea>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default AddProperty;
