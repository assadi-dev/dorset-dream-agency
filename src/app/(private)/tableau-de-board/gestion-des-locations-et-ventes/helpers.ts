export const STATUS_STYLES = {
    death: "",
    disappearance: "ring-warning bg-warning/20 text-orange-800",
    investigation: "ring-blue-500 bg-blue-500/10 text-blue-500",
    ongoing: "ring-green-500 bg-green-500/10 text-green-700",
    cancelled: "ring-destructive !bg-destructive/20 text-destructive hover:bg-destructive/20",
} as const;

export const STATUS_DISPLAY_NAME = {
    death: "Décès",
    disappearance: "Disparition",
    investigation: "Perquisition",
    ongoing: "En cours",
    cancelled: "Annulé",
};

export const STATUS_OPTIONS = [
    {
        id: 1,
        label: STATUS_DISPLAY_NAME.ongoing,
        value: "ongoing",
    },
    {
        id: 2,
        label: STATUS_DISPLAY_NAME.cancelled,
        value: "cancelled",
    },
    {
        id: 3,
        label: STATUS_DISPLAY_NAME.investigation,
        value: "investigation",
    },
    {
        id: 4,
        label: STATUS_DISPLAY_NAME.disappearance,
        value: "disappearance",
    },
    {
        id: 5,
        label: STATUS_DISPLAY_NAME.death,
        value: "death",
    },
];
