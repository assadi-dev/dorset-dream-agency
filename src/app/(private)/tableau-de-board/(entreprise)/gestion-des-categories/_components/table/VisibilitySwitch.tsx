"use client";

import { Switch } from "@/components/ui/switch";
import { useCategoriesMutation } from "../../_hooks/useCategoriesMutation";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";

type Props = {
    category: any;
}
export const VisibilitySwitch = ({ category }: Props) => {


    const { toggleVisibility } = useCategoriesMutation();

    const handleToggleVisibility = async () => {
        console.log(category.isVisible);
        try {
            await toggleVisibility({ ids: [category.id], isVisible: !category.isVisible });
            const successMessage = !category.isVisible ? `La categorie ${category.name} est maintenant visible` : `La categorie ${category.name} est maintenant masquée`;
            ToastSuccessSonner(successMessage);
        } catch (error) {
            ToastErrorSonner("Erreur lors de la mise à jour de la visibilité");
        }
    };

    return (
        <Switch key={category.id} defaultChecked={category.isVisible} onCheckedChange={handleToggleVisibility} />
    );
};