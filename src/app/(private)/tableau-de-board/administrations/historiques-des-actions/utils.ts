import { API_INSTANCE } from "@/lib/api";

export enum QUERY_USERS_ACTIONS {
    GET_USERS_ACTION_COLLECTIONS = "GET_USERS_ACTION_COLLECTIONS",
}
type UserActionCollectionParams = {
    page: number;
    limit: number;
    search: string;
    actions: string;
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
