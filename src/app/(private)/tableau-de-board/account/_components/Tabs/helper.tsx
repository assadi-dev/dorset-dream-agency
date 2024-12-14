import { TabsArrayElementType } from "../../type";
import PasswordForm from "../form/PasswordForm";
import PersonalDataForm from "../form/PersonalDataForm";

export const TAB_ARRAY_ELEMENT: TabsArrayElementType[] = [
    {
        id: "account",
        title: "Info Personnelle",
        component: <PersonalDataForm />,
    },
    {
        id: "password",
        title: "Mot de pase",
        component: <PasswordForm />,
    },
];
