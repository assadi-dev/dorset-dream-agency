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

export type fetchClientLocationsArgs = {
    id?: string | number;
    type?: "location" | "vente" | "prestige";
};
export const fetchClientLocations = async ({ id, type }: fetchClientLocationsArgs) => {
    try {
        const res = await API_INSTANCE.get(`/client/${id}/transactions?type=${type}`);
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
        await wait(1000);
        return [{ id: 1, agent: "Eden Myers", createdAt: new Date().toISOString() }];
    } catch (error) {
        throw error;
    }
};
