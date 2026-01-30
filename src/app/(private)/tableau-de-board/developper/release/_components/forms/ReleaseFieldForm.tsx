"use client";
import React from "react";
import SelectName from "./SelectName";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FieldType = {
    id?: string;
    name: string;
    value: string;
};
type ReleaseFieldFormProps = {
    defaultValue?: Partial<FieldType>;
    onConfirm: (field: FieldType) => void;
    onCancel: () => void;
};
const ReleaseFieldForm = ({ defaultValue, onConfirm, onCancel }: ReleaseFieldFormProps) => {
    const [state, setState] = React.useState<FieldType>({
        name: defaultValue?.name ?? "",
        value: defaultValue?.value ?? "",
    });

    const handleSelect = (name: string) => {
        setState((prev) => ({ ...prev, name }));
    };

    const handleSubmit = () => {
        onConfirm(state);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setState((prev) => ({ ...prev, value }));
    };

    return (
        <div className="py-4 flex flex-col gap-4 w-[28vw]">
            <div className="mb-3">
                <Label htmlFor="name" className="text-slate-500">
                    TITRE
                </Label>
                <SelectName value={state.name} onChange={handleSelect} />
            </div>
            <div className="mb-3">
                <Label htmlFor="value" className="text-slate-500">
                    CONTENU
                </Label>
                <Textarea value={state.value} rows={10} className="w-full resize-none" onChange={handleChange} />
            </div>
            <div className="flex gap-2 my-3 w-full ">
                <Button type="button" variant="outline" onClick={onCancel} className="w-full">
                    Annuler
                </Button>
                <Button type="button" onClick={handleSubmit} className="w-full" disabled={!state.value && !state.name}>
                    Ajouter
                </Button>
            </div>
        </div>
    );
};

export default ReleaseFieldForm;
