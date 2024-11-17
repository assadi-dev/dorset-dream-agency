import { API_INSTANCE } from "@/lib/api";

export const fetEmployeeForTrombinoscope = async () => {
    const res = await API_INSTANCE.get("/employees/collections");
    return res.data;
};
