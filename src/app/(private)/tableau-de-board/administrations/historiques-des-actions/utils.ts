import { API_INSTANCE } from "@/lib/api";
import { addDays } from "date-fns";

export enum QUERY_USERS_ACTIONS {
    GET_USERS_ACTION_COLLECTIONS = "GET_USERS_ACTION_COLLECTIONS",
}
type UserActionCollectionParams = {
    page: number;
    limit: number;
    search: string;
    actions: string;
    from: string;
    to: string;
};
export const fetchUserActionCollection = async (params: UserActionCollectionParams) => {
    try {
        const res = await API_INSTANCE.get("/userActions/collections", {
            params,
        });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
};

export const INIT_DATE = {
    from: addDays(new Date().setHours(0, 0, 0, 0), -30),
    to: new Date(new Date().setHours(23, 59, 59, 999)),
};
