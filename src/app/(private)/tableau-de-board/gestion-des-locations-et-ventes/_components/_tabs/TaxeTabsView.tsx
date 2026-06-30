"use client"

import { Button } from "@/components/ui/button"
import SelectTaxes from "../forms/SelectTaxes"
import FormFieldInput from "@/components/forms/FormFieldInput"
import { UseFormReturn } from "react-hook-form"
import { LocationVentesFormType } from "../forms/schema"
import { Plus, Trash } from "lucide-react"
import React from "react"
import { Input } from "@/components/ui/input"

const TaxeTabsView = ({ form }: { form: UseFormReturn<LocationVentesFormType> }) => {

    const taxesWatch = form.watch("taxes") || [];
    const [taxesRows, setTaxesRow] = React.useState(taxesWatch);

    const handleClickAddTax = () => {
        const newRow = { key: `taxes-${taxesRows.length}`, id: "none", value: "none", name: "Aucune", rate: 0 }
        setTaxesRow((prev) => [...prev, newRow]);
    };

    const handleRemoveTax = (key: string) => {
        form.setValue("taxes", form.getValues("taxes")?.filter((t) => t.key !== key));
        setTaxesRow((prev) => prev.filter((t) => t.key !== key));
    };

    const handleTaxChange = (key: string, value: any) => {
        console.log(key);
        const taxes = taxesRows || [];
        const exist = taxes.find((t) => t.key === key);
        if (exist) {
            const newTaxes = taxes.map((t) => {
                if (t.key === key) {
                    return { ...t, ...value, id: value.id, rate: String(value.value) };
                }
                return t;
            });
            form.setValue("taxes", newTaxes);
            setTaxesRow(newTaxes);
            return;
        } else {
            const newTaxes = [...taxes, { key, ...value }];
            form.setValue("taxes", newTaxes);
            setTaxesRow(newTaxes);
        }

    };


    const handleInputChange = (key: string, value: string) => {
        const taxes = taxesRows || [];
        const exist = taxes.find((t) => t.key === key);
        if (exist) {
            const newTaxes = taxes.map((t) => {
                if (t.key === key) {
                    return { ...t, rate: Number(value) };
                }
                return t;
            });
            form.setValue("taxes", newTaxes);
            setTaxesRow(newTaxes);
        }
    };




    return (
        <>

            <div className="flex-1 flex flex-col">
                {taxesRows.length > 0 && <div className="mb-4 flex justify-between items-center">
                    <p>Ajouter des taxes</p>
                    <Button size="icon" variant="secondary" type="button" onClick={handleClickAddTax}><Plus className="w-4 h-4" /></Button>
                </div>}
                <div className="flex-1 rounded-lg">

                    {
                        taxesRows.length === 0 && (
                            <div className="flex-1 rounded-lg p-4 justify-center items-center flex w-full min-h-[100px]">
                                <div className="flex flex-col items-center gap-4">
                                    <p>Aucune taxe ajoutée</p>
                                    <Button size="icon" variant="secondary" type="button" onClick={handleClickAddTax}><Plus className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        )
                    }

                    <ul className="flex flex-col gap-4 overflow-y-auto max-h-[35vh] w-full p-2">
                        {taxesRows?.map((tax, index) => (
                            <li key={tax.key} className="grid grid-cols-[1fr_0.5fr_auto] gap-4 items-center">
                                <SelectTaxes form={form} onchange={(value) => handleTaxChange(tax.key, value)} defaultValue={tax.value} />
                                <Input type="number" className="text-center" value={tax.rate} onChange={(e) => handleInputChange(tax.key, e.target.value)} />
                                <Button size="icon" variant="destructive" type="button" onClick={() => {
                                    tax.key && handleRemoveTax(tax.key);
                                }}><Trash className="w-4 h-4" /></Button>
                            </li>
                        ))}

                    </ul>

                </div>



            </div>

        </>
    );
};

export default TaxeTabsView;