import { API_INSTANCE } from "@/lib/api";

export enum QUERY_EMPLOYEE_ACCOUNT_QUERY {
    GET_EMPLOYEE_ACCOUNT = "GET_EMPLOYEE_ACCOUNT",
    UPDATE_EMPLOYEE_DATA = "UPDATE_EMPLOYEE_DATA",
    UPDATE_EMPLOYEE_ACCOUNT = "UPDATE_EMPLOYEE_ACCOUNT",
}

export const fetchEmployeeData = async () => {
    try {
        const res = await API_INSTANCE.get("/me");
        return res.data;
    } catch (error: any) {
        if (error instanceof Error) {
            throw error;
        }
    }
};

type updateEmployeeDataArg = {
    firstName: string;
    lastName: string;
    email: string;
    pone: string;
};
/* export const updateEmployeeData = async (data:updateEmployeeDataArg) => {
    try {
        const res = await API_INSTANCE.post("/employee",);
        return res.data;
    } catch (error: any) {
        if (error instanceof Error) {
            throw error;
        }
    }
}; */
