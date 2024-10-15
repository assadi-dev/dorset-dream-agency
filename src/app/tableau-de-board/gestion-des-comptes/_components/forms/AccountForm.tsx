import { Form } from "@/components/ui/form";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserCreateInputDto, userSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";

type AccountFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    defaultValues: UserCreateInputDto;
    save: (values: UserCreateInputDto) => Promise<any>;
};
const AccountForm = ({ defaultValues, save, ...props }) => {
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<UserCreateInputDto>({
        resolver: zodResolver(userSchema),
        defaultValues: { ...defaultValues },
    });

    const processing: SubmitHandler<UserCreateInputDto> = async (values) => {
        startTransition(async () => {
            try {
                save(values);
                ToastSuccessSonner(`Le compte de l'utilisateur ${defaultValues.useername} à été mise à jours`);
            } catch (error: any) {
                const message = `Raison: ${error.message}`;
                ToastErrorSonner(message);
            }
        });
    };

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(processing)}></form>
        </Form>
    );
};

export default AccountForm;
