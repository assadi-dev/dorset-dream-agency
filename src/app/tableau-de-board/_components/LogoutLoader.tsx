import React from "react";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { wait } from "@/lib/utils";

const LogoutLoader = () => {
    const [isPending, startTransition] = React.useTransition();
    startTransition(async () => {
        try {
            //await signOut();
            await wait(3000);
            ToastSuccessSonner("Vous êtes déconnecté");
        } catch (error) {
            ToastErrorSonner(`Impossible  de vous déconnecter raison: ${error.message}`);
        }
    });
    return (
        <div>
            <h1>Deconnexion en cours</h1>
        </div>
    );
};

export default LogoutLoader;
