import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useClientOptions = () => {
    const fetchClient = async () => {
        const res = await API_INSTANCE.get("/clients/options");
        return res.data;
    };

    const query = useQuery({ queryKey: ["clients-options"], queryFn: fetchClient });

    return query;
};

export default useClientOptions;
