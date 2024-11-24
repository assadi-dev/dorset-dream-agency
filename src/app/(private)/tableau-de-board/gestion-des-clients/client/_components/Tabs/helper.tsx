import { API_INSTANCE } from "@/lib/api";
import { ClientTabsType } from "../../types";
import LocationsView from "./LocationsView";
import PerquisitionWarrantView from "./PerquisitionWarrantView";
import PrestigeView from "./PrestigeView";
import SelsView from "./SelsView";
import { PurchaseType } from "@/app/types/properties";
import { wait } from "@/lib/utils";

export const CLIENT_TABS_DATA: ClientTabsType[] = [
    {
        title: "Locations",
        value: "location",
        component: LocationsView,
    },
    {
        title: "Ventes",
        value: "vente",
        component: SelsView,
    },
    {
        title: "Mandat perquisition",
        value: "perquisitionWarrant",
        component: PerquisitionWarrantView,
    },
    {
        title: "Prestige",
        value: "prestige",
        component: PrestigeView,
    },
];

export type filterClientTransaction = {
    type?: "location" | "vente" | "prestige";
    search?: string;
    limit?: number;
    page?: number;
};
export type fetchClientLocationsArgs = {
    id?: string | number;
    filters: filterClientTransaction;
};
export const fetchClientLocations = async ({ id, filters }: fetchClientLocationsArgs) => {
    try {
        const res = await API_INSTANCE.get(`/client/${id}/transactions`, {
            params: {
                ...filters,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export type fetchClientPerquisitionWarrantArgs = {
    id?: string | number;
};
export const fetchClientPerquisitionWarrant = async ({ id }: fetchClientPerquisitionWarrantArgs) => {
    try {
        const res = await API_INSTANCE.get(`/client/${id}/perquisitions`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const createPerquisition = async (formData: FormData) => {
    const res = await API_INSTANCE.post("uploads/photos/perquisitions", formData);
    return res.data;
};
