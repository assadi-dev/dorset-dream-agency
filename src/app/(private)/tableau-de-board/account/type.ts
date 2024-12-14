import { RoleEnum } from "@/app/types/user";
import React from "react";

export type TabsArrayElementType = {
    id: string;
    title: string;
    component: React.ReactElement;
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
