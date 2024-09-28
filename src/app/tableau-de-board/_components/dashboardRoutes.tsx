import { DashboardNavigationType } from "./types";

export const dashboardNavigation: DashboardNavigationType[] = [
    {
        name: "Tableau de board",
        path: "/tableau-de-board",
    },
    {
        name: "Gestion de l'entreprise",
        children: [
            {
                name: "Gestion des biens immobiliers",
                path: "/tableau-de-board/gestion-des-biens-immobiliers",
            },
            {
                name: "Gestion des employés",
                path: "/tableau-de-board/gestion-employes",
            },
        ],
    },
];
