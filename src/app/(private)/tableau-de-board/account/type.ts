import { RoleEnum } from "@/app/types/user";
import React from "react";

export type TabsArrayElementType = {
    id: string;
    title: string;
    component: React.FC<any>;
};

export type Session = {
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
        employeeID: number;
        grade: string;
        role: RoleEnum;
    };
    expires: string;
};

export type UserData = {
    userId: number;
    username: string;
    employeeID: number;
    iban: string;
    lastName: string;
    firstName: string;
    gender: "Male" | "Female" | null;
    grade: "Employée" | "Manageuse" | "Patron" | "Employé San Andreas" | "Employé îles Galapagos" | null;
    phone: string | null;
    createdAt: string | null;
};
