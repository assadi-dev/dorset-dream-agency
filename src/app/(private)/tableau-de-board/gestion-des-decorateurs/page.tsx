import { ENV } from "@/config/global";
import { Metadata } from "next";

export const generateMetadata = () => {
    const metadata: Metadata = {
        title: `Gestion des décorateurs - ${ENV.APP_TITLE}`,
        description: `Panel d'administration de l'agence immobilier ${ENV.APP_TITLE}`,
    };

    return metadata;
};

const GestionDecorateurPage = async () => {
    return (
        <div>GestionDecorateurPage</div>
    )
}

export default GestionDecorateurPage