import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut, PowerOff } from "lucide-react";
import React from "react";
import ModalProvider from "@/components/Modals/ModalProvider";
import { Button } from "@/components/ui/button";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    const [isPending, startTransition] = React.useTransition();

    const logout = () => {
        startTransition(async () => {
            try {
                await signOut();
                ToastSuccessSonner("Vous êtes déconnecté");
            } catch (error: any) {
                ToastErrorSonner(`Impossible  de vous déconnecter raison: ${error.message}`);
            }
        });
    };
    return (
        <Button
            variant="ghost"
            type="button"
            onClick={logout}
            className="justify-start  items-center  w-full"
            disabled={isPending}
        >
            <LogOut className="h-4 w-4" /> Déconnexion
        </Button>
    );
};

export default LogoutButton;
