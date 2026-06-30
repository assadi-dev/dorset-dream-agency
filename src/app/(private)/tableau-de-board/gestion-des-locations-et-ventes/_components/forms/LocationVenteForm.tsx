import React from "react";
import { LocationVentesFormSchema, LocationVentesFormType, LocationVentesSchema, PROPERTY_TYPE_ENUM } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import useModalState from "@/hooks/useModalState";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";
import { DialogFooter } from "@/components/ui/dialog";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/forms/FormFieldInput";
import useClientOptions from "@/hooks/useClientOptions";
import FormFieldComboBox from "@/components/forms/FormFieldComboBox";
import usePropertyWithVariantOptions from "@/hooks/usePropertyWithVariantOption";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import { STATUS_OPTIONS } from "../../helpers";
import { Button } from "@/components/ui/button";
import { Coins, Info, Pencil, Plus } from "lucide-react";
import { setClientSync, setPriceSync, setPropertySync } from "./helper";
import SelectTaxes from "./SelectTaxes";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Separator } from "@radix-ui/react-separator";
import TaxeTabsView from "../_tabs/TaxeTabsView";

type FormType = React.FormHTMLAttributes<HTMLFormElement> & {
    defaultFormValues?: Partial<LocationVentesFormType>;
    save: (value: LocationVentesFormType) => Promise<any>;
};
const LocationVenteForm = ({ defaultFormValues, save, ...props }: FormType) => {
    const modalState = useModalState();
    const [isPending, startTransition] = React.useTransition();
    const [disablePrice, setDisablePrice] = React.useState(false);

    const clientOptions = useClientOptions();
    const propertyOptions = usePropertyWithVariantOptions();
    const CLIENT_OPTIONS = React.useMemo(() => {
        if (!clientOptions.data) return [];
        return clientOptions.data;
    }, [clientOptions.data]);
    const PROPERTY_OPTIONS = React.useMemo(() => {
        if (!propertyOptions.data) return [];
        return propertyOptions.data;
    }, [propertyOptions.data]);


    const form = useForm<LocationVentesFormType>({
        resolver: zodResolver(LocationVentesFormSchema),
        defaultValues: { ...defaultFormValues },
    });



    const processing = async (values: LocationVentesFormType) => {
        try {
            await save(values);
            ToastSuccessSonner("Le client à bien été créer avec success");
            modalState.closeModal();
        } catch (error: any) {
            const message = `Raison: ${error.message}`;
            ToastErrorSonner(message);
        }
    };
    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;

    const submitData: SubmitHandler<LocationVentesFormType> = async (values) => {
        startTransition(async () => processing(values));
    };


    const total = React.useMemo(() => {
        const taxesRows = form.watch("taxes") || [];
        const sum = Number(form.watch("price") || 0) + Number(taxesRows.reduce((acc, tax) => Number(acc || 0) + Number(tax.rate || 0), 0))
        return sum;
    }, [form.watch("taxes"), form.watch("price")]);

    const TaxeBadge = () => {
        const taxesRows = form.watch("taxes") || [];
        if (taxesRows.length === 0) return null;
        return <span className="ml-2 rounded-full bg-orange-500 w-5 h-5 text-xs grid place-items-center text-slate-900 scale-90">{taxesRows.length}</span>;
    };

    return (
        <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger className="data-[state=active]:bg-secondary w-full" value="info"> <Info className="h-4 w-4 mr-2" /> Informations</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-secondary w-full" value="taxes"> <Coins className="h-4 w-4 mr-2" /> Taxes {<TaxeBadge />}</TabsTrigger>
            </TabsList>
            <Form {...form}>
                <form {...props} onSubmit={form.handleSubmit(submitData)}>
                    <Separator className="bg-slate-300/25 w-full mb-4 h-[0.3px] rounded-full" />
                    <div className="min-h-[50vh] w-full flex flex-col">
                        <TabsContent value="info" className="h-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {" "}
                                <div className="mb-4">
                                    <FormFieldComboBox
                                        form={form}
                                        control={form.control}
                                        label="Clients"
                                        name="client"
                                        options={CLIENT_OPTIONS}
                                        placeholder="Sélectionnez un clients"
                                        classNameButton="w-full"
                                        emptyMessage="Pas de clients enregistré"
                                        onChange={(value) => setClientSync(form, value, CLIENT_OPTIONS)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <FormFieldComboBox
                                        form={form}
                                        control={form.control}
                                        label="Biens immobiliers"
                                        name="property"
                                        options={PROPERTY_OPTIONS}
                                        placeholder="Sélectionnez un Biens immobilier"
                                        classNameButton="w-full"
                                        emptyMessage="Pas de biens enregistré"
                                        onChange={(value) => setPropertySync(form, value, PROPERTY_OPTIONS)}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <FormFieldInput control={form.control} label="N° Téléphone" name="phone" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">


                                <div className="mb-4">
                                    <FormFieldSelect
                                        control={form.control}
                                        label="Type de service"
                                        name="propertyService"
                                        options={PROPERTY_TYPE_ENUM}
                                        onChange={(value) => setPriceSync(form, value, PROPERTY_OPTIONS)}
                                    />
                                </div>
                                <div className="mb-4 relative">
                                    <FormFieldInput
                                        control={form.control}
                                        label="Prix de la location - Vente"
                                        name="price"
                                        disabled={disablePrice}
                                        className=" opacity-100 font-semibold"

                                    />

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="flex justify-center items-center absolute right-0 top-0 !bg-transparent active:scale-90"
                                        type="button"
                                        onClick={() => setDisablePrice(!disablePrice)}
                                    >
                                        {" "}
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </div>



                            </div>

                            <div className="mb-4 grid gap-2 grid-cols-2">
                                <div>
                                    <FormFieldInput
                                        control={form.control}
                                        label="Nombre de clé(s)"
                                        name="keyQuantity"
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <FormFieldInput control={form.control} label="Numéro de la clé" name="keyNumber" />
                                </div>
                            </div>
                            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-1">
                                <FormFieldInput control={form.control} label="Numéro de facture (optionnel)" name="invoice" />
                                <FormFieldSelect control={form.control} label="Status" name="status" options={STATUS_OPTIONS} />
                            </div>


                        </TabsContent>
                        <TabsContent value="taxes" className="h-full flex-1 flex flex-col">
                            <TaxeTabsView form={form} />
                        </TabsContent>
                    </div>
                    <Separator className="bg-slate-300/25 w-full mb-4 h-[0.3px] rounded-full" />
                    <div className=" flex justify-end">
                        <p className="text-xl">Total: <span className="font-bold ml-1">{total}$</span></p>
                    </div>

                    <DialogFooter className="pt-3">
                        <SubmitButton isLoading={isPending} className="mx-auto w-full" type="submit">
                            {SUBMIT_LABEL}
                        </SubmitButton>
                    </DialogFooter>
                </form>
            </Form>
        </Tabs>
    );
};

export default LocationVenteForm;
