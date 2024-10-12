import React from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

type FormType = UseFormReturn<FieldValues, any, undefined>;
type formContextType = {
    form?: FormType | null;
    defaultValues?: any;
    setState?: () => void;
};

type FormProviderType = {
    children: React.ReactNode;
};

export const formContext = React.createContext<formContextType>({
    form: null,
    defaultValues: null,
    setState: () => {},
});

const Provider = formContext.Provider;
const reducer = (prev: formContextType, next: any) => ({ ...prev, ...next });

const FormProvider = ({ children }: FormProviderType) => {
    const [state, setState] = React.useReducer(reducer, {
        form: null,
        defaultValues: null,
    });

    return (
        <Provider value={{ form: state.form, defaultValues: state.defaultValues, setState: () => setState }}>
            {children}
        </Provider>
    );
};

export default FormProvider;
