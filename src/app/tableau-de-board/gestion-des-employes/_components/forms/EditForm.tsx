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
        return data.map((secteur) => {
            secteur.value = secteur.value.toString();
            return secteur;
        });
    }, [data, isFetching]);

    React.useEffect(() => {
        if (payload?.secteur && SECTEURS_OPTIONS.length) {
            const toArray: Array<string> = payload?.secteur?.split(",") || [];
            const cleanArraySecteur = toArray.map((v) => {
                const secteur = SECTEURS_OPTIONS.find((option) => option.label === v);
                return secteur;
            });

            if (cleanArraySecteur.length)
                setDefaultFormValues({
                    ...defaultFormValues,
                    secteur: cleanArraySecteur,
                });
        }
    }, [payload.secteur, SECTEURS_OPTIONS]);

    const handleSaveUpdateEmployee = async (values: gestionEmployeeSchemaType) => {
        try {
            await editEmployeeData(employeeID, values);
            closeModal();
            router.push(pathname);
            router.refresh();
        } catch (error) {
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
