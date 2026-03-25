"use client"

import FormFieldInput from '@/components/forms/FormFieldInput';
import SubmitButton from '@/components/forms/SubmitButton';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from '@/config/messages';
import useModalState from '@/hooks/useModalState';
import { cn } from '@/lib/utils';
import React from 'react'
import { useForm } from 'react-hook-form';
import UploadPhoto from './UploadPhoto';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


type DecoratorFormProps = {
    defaultValues?: any;
    handleOnSubmit: (data: any) => Promise<void>;
    labelButton?: string;
    className?: string;
}
const DecoratorForm = ({ defaultValues, handleOnSubmit, labelButton = SUBMIT_IDLE_MESSAGE, className }: DecoratorFormProps) => {
    const [isPending, startTransition] = React.useTransition();
    const modalState = useModalState();

    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : labelButton;

    const form = useForm<any>({

        defaultValues: {
            lastName: "",
            firstName: "",
            phone: "",
            email: "",
            speciality: "",


            ...defaultValues,
        },
    });





    return (
        <Form {...form}>


            <form className={cn('flex flex-col gap-4', className)} onSubmit={handleOnSubmit}>
                <Tabs defaultValue="form" className="w-full">
                    <TabsList>
                        <TabsTrigger value="form">Formulaire</TabsTrigger>
                        <TabsTrigger value="photo">Photo</TabsTrigger>
                    </TabsList>
                    <TabsContent className='lg:h-[45vh]' value="photo"> <UploadPhoto control={form.control} name="photo" label="Photo" /></TabsContent>
                    <TabsContent className='lg:h-[45vh]' value="form">

                        <div className="mb-4 grid grid-cols-2 gap-3">
                            <FormFieldInput control={form.control} name="lastName" label="Nom" />
                            <FormFieldInput control={form.control} name="firstName" label="Prénom" />
                        </div>

                        <div className="mb-4 grid grid-cols-1 xl:grid-cols-2 gap-3">
                            <FormFieldInput control={form.control} name="phone" label="N° Téléphone" />
                            <FormFieldInput control={form.control} name="email" label="Email" />
                        </div>
                        <div className="mb-4 grid grid-cols-1 xl:grid-cols-2 gap-3">
                            <FormFieldInput control={form.control} name="experience" label="Experience" />
                            <FormFieldInput control={form.control} name="averageTime" label="Temps de création moyen" />
                        </div>
                        <div className="mb-4">
                            <FormFieldInput control={form.control} name="speciality" label="Type de decoration" />
                        </div>
                    </TabsContent>

                    <div className="pt-3 w-full">
                        <SubmitButton isLoading={isPending} className="mx-auto w-full" type="submit">
                            {SUBMIT_LABEL}
                        </SubmitButton>
                    </div>
                </Tabs>
            </form>
        </Form>
    )
}

export default DecoratorForm