import { STATUS_STYLES } from "../helpers";

/**
 * @param seller nom et prénom du vendeur
 * @param client nom et prénom du client
 * @param phone numéro de téléphone du client
 */
export type LocationColumnType = {
    id: number;
    seller: string;
    client: string;
    sellingPrice: number;
    phone: string;
    createdAt: string;
};

export type LocationStatus = keyof typeof STATUS_STYLES;
