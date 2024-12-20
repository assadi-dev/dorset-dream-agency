import { DashboardNavigationType } from "./types";
import { LayoutDashboard, Home, Building2, Globe, Inbox, Gem, Search, Settings, SquareUser } from "lucide-react";

export const dashboardNavigation: DashboardNavigationType[] = [
    {
        title: "Tableau de board",
        path: "/tableau-de-board",
        icon: LayoutDashboard,
    },
    {
        title: "Agence Immobilière",
        icon: Inbox,
        children: [
            {
                title: "Clients",
                path: "/tableau-de-board/gestion-des-clients",
            },
            {
                title: "Locations/Ventes",
                path: "/tableau-de-board/gestion-des-locations-et-ventes",
            },
        ],
    },
    {
        title: "Prestiges",
        path: "/tableau-de-board/prestiges",
        icon: Gem,
    },
    {
        title: "Trombinoscope",
        path: "/tableau-de-board/trombinoscope",
        icon: SquareUser,
    },
    {
        title: "Gestion de l'entreprise",
        icon: Building2,
        children: [
            /*   {
                title: "Annonces",
                path: "/tableau-de-board/gestion-des-annonces",
            }, */
            {
                title: "Immobiliers",
                path: "/tableau-de-board/gestion-des-biens-immobiliers",
            },
            {
                title: "Employés",
                path: "/tableau-de-board/gestion-des-employes",
            },
            {
                title: "Comptes",
                path: "/tableau-de-board/gestion-des-comptes",
            },
        ],
    },
    {
        title: "Site du catalogue",
        icon: Globe,
        path: "/",
    },
];

const remove = ["Gestion de l'entreprise", "Prestiges"];
export const dashboardNavigationUser = dashboardNavigation.filter((page) => {
    return !remove.includes(page.title);
});
