import { DashboardNavigationType } from "./types";

export const dashboardNavigation: DashboardNavigationType[] = [
    {
        name: "Tableau de board",
        path: "/tableau-de-board",
    },
    {
        name: "Agence Immobilière",
        children: [
            {
                name: "Clients",
                path: "/tableau-de-board/gestion-des-clients",
            },
            {
                name: "Locations/Ventes",
                path: "/tableau-de-board/gestion-des-locations-et-ventes",
            },
        ],
    },
    {
        name: "Prestiges",
        path: "/tableau-de-board/prestiges",
    },
    {
        name: "Trombinoscope",
        path: "/tableau-de-board/trombinoscope",
    },
    {
        name: "Gestion de l'entreprise",
        children: [
            {
                name: "Immobiliers",
                path: "/tableau-de-board/gestion-des-biens-immobiliers",
            },
            {
                name: "Employés",
                path: "/tableau-de-board/gestion-des-employes",
            },
            {
                name: "Comptes",
                path: "/tableau-de-board/gestion-des-comptes",
            },
            /*   {
                name: "Gestion des annonces",
                path: "/tableau-de-board/gestion-des-annonces",
            }, */
        ],
    },
    {
        name: "Site du catalogue",
        path: "/",
    },
];
