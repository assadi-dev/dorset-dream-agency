import { Form } from "@/components/ui/form";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserCreateInputDto, userEditFormType, userSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import FormFieldInputPassword from "@/components/forms/FormFieldInputPassword";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import { ROLE_OPTIONS } from "@/config/enums";
import { DialogFooter } from "@/components/ui/dialog";
import SubmitButton from "@/components/forms/SubmitButton";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";

type AccountFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    defaultValues: userEditFormType;
    save: (values: userEditFormType) => Promise<any>;
};
const AccountForm = ({ defaultValues, save, ...props }: AccountFormProps) => {
    const [isPending, startTransition] = React.useTransition();
    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;

    const form = useForm<userEditFormType>({
        resolver: zodResolver(userSchema),
        defaultValues: { ...defaultValues },
    });

    const processing: SubmitHandler<userEditFormType> = async (values) => {
        startTransition(async () => {
            try {
                await save(values);
                ToastSuccessSonner(`Le compte de l'utilisateur ${defaultValues.username} à été mise à jours`);
            } catch (error: any) {
                const message = `Raison: ${error.message}`;
                ToastErrorSonner(message);
            }
        });
    };

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(processing)}>
                <div className="mb-4">
                    <FormFieldInput
                        control={form.control}
                        name="username"
                        label="Identifiant de connexion"
                        autoComplete="username"
                    />
                </div>

                <div className="mb-4">
                    <FormFieldSelect control={form.control} name="role" label="Role" options={ROLE_OPTIONS} />
                </div>
                <DialogFooter className="pt-3">
                    <SubmitButton isLoading={isPending} className="mx-auto w-full" type="submit">
                        {SUBMIT_LABEL}
                    </SubmitButton>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default AccountForm;
