import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const usePropertyWithVariantOptions = () => {
    const fetchPropertyOptions = async () => {
        const res = await API_INSTANCE.get("/properties/variants/options");
        return res.data;
    };

    const query = useQuery({
        queryKey: ["properties_options"],
        queryFn: fetchPropertyOptions,
    });
    return query;
};

export default usePropertyWithVariantOptions;
