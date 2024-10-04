import { ClientTabsType } from "../../types";
import LocationsView from "./LocationsView";
import PerquisitionWarrantView from "./PerquisitionWarrantView";
import PrestigeView from "./PrestigeView";
import SelsView from "./SelsView";

export const CLIENT_TABS_DATA: ClientTabsType[] = [
    {
        title: "Locations",
        value: "locations",
        component: LocationsView,
    },
    {
        title: "Ventes",
        value: "sales",
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
