import FormFieldMultiSelect from "@/components/forms/FormFieldMultiSelect";

const SecteurSelect = async ({ form }) => {
    const SECTEURS_OPTIONS = await getSecteurs();

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
