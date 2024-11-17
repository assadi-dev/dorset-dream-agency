import { ILES_GALAPAGOS_IMAGE, SAN_ANDREAS_IMAGE } from "@/config/image";
import { API_INSTANCE } from "@/lib/api";

export const fetEmployeeForTrombinoscope = async () => {
    const res = await API_INSTANCE.get("/employees/collections");
    return res.data;
};

export const SECTEUR_OBJECT_LOGO = {
    ["San Andreas"]: SAN_ANDREAS_IMAGE,
    ["Iles Galapagos"]: ILES_GALAPAGOS_IMAGE,
};
