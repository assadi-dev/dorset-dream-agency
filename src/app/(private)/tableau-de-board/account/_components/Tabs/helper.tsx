import { TabsArrayElementType } from "../../type";
import AccountForm from "../form/AccountForm";
import PersonalDataForm from "../form/PersonalDataForm";

export const TAB_ARRAY_ELEMENT: TabsArrayElementType[] = [
    {
        id: "employee",
        title: "Info Personnelle",
        component: <PersonalDataForm />,
    },
    {
        id: "account",
        title: "Mon compte",
        component: <AccountForm />,
    },
];
