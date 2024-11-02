import useModalState from "@/hooks/useModalState";
import React from "react";
import GestionEmployeeForm from "./GestionEmployeeForm";
import { gestionEmployeeSchemaType } from "./schema";
import { editEmployeeData } from "../../actions";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useFetchSecteursOptions from "@/hooks/useFetchSecteurOptions";

const EditForm = () => {
    const { closeModal, payload } = useModalState();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const router = useRouter();

    const employeeID = payload.id;

    type defaultFormValues = {
        post: string;
        iban: string;
        firstName: string;
        lastName: string;
        secteur: Array<any>;
        gender: string;
        phone: string;
    };
    const [defaultFormValues, setDefaultFormValues] = React.useState({
        post: payload.grade,
        iban: payload.iban,
        firstName: payload.firstName,
        lastName: payload.lastName,
        secteur: [],
        gender: payload.gender,
        phone: payload.phone,
    });

    const { data, isFetching } = useFetchSecteursOptions();

    const SECTEURS_OPTIONS = React.useMemo(() => {
        if (!data && isFetching) return [];
        return data.map((secteur: any) => {
            secteur.value = secteur.value.toString();
            return secteur;
        });
    }, [data, isFetching]);

    React.useEffect(() => {
        if (payload?.secteur && SECTEURS_OPTIONS.length) {
            const toArray: Array<string> = payload?.secteur?.split(",") || [];
            const cleanArraySecteur = toArray.map((v) => {
                const secteur = SECTEURS_OPTIONS.find((option: any) => option.label === v);
                return secteur;
            }) as Array<never>;

            if (cleanArraySecteur.length)
                setDefaultFormValues({
                    ...defaultFormValues,
                    secteur: cleanArraySecteur,
                });
        }
    }, [payload.secteur, SECTEURS_OPTIONS]);

    const handleSaveUpdateEmployee = async (values: gestionEmployeeSchemaType) => {
        try {
            const secteursIds = values.secteur.map((v) => Number(v.value));
            const copy = { ...values, secteursIds };

            await editEmployeeData(employeeID, copy);
            closeModal();
            router.push(pathname);
            router.refresh();
        } catch (error: any) {
            throw error;
        }
    };

    return (
        <div>
            {defaultFormValues && (
                <GestionEmployeeForm
                    defaultFormValues={defaultFormValues}
                    save={handleSaveUpdateEmployee}
                    className=" w-[95vw] sm:w-[25vw]"
                />
            )}
        </div>
    );
};

export default EditForm;
