"use clint";
import FormFieldMultiSelect from "@/components/forms/FormFieldMultiSelect";
import { getSecteursOptions } from "@/database/drizzle/repositories/secteurs";
import useFetchSecteursOptions from "@/hooks/useFetchSecteurOptions";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type SecteurSelectProps = {
    form: UseFormReturn<any>;
};
const SecteurSelect = async ({ form }: SecteurSelectProps) => {
    const { data } = useFetchSecteursOptions();
    const SECTEURS_OPTIONS = React.useMemo(() => {
        if (data) return data;
        return [];
    }, [data]);

    return (
        <FormFieldMultiSelect
            control={form.control}
            name="secteur"
            options={SECTEURS_OPTIONS}
            label="Secteur"
            iconBadgeClearButtonClassName="text-white hover:text-white"
        />
    );
};

export default SecteurSelect;
