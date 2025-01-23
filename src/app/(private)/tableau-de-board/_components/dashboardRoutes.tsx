import { DashboardNavigationType } from "./types";
import {
    LayoutDashboard,
    Home,
    Building2,
    Globe,
    Inbox,
    Gem,
    Search,
    Settings,
    Shield,
    SquareUser,
} from "lucide-react";

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
            {
                title: "Annonces",
                path: "/tableau-de-board/gestion-des-annonces",
            },
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
        title: "Administration",
        icon: Shield,
        children: [
            {
                title: "Comptes",
                path: "/tableau-de-board/administrations/gestion-des-comptes",
            },
            {
                title: "Historiques des actions",
                path: "/tableau-de-board/administrations/historiques-des-actions",
            },
            {
                title: "Corbeille",
                path: "/tableau-de-board/administrations/corbeille",
            },
        ],
    },
    {
        title: "Site du catalogue",
        icon: Globe,
        path: "/",
    },
];

export const dashboardNavigationUser = dashboardNavigation.filter((page) => {
    return !["Gestion de l'entreprise", "Prestiges", "Administration"].includes(page.title);
});
export const dashboardNavigationPatron = dashboardNavigation.filter((page) => {
    return !["Administration"].includes(page.title);
});
