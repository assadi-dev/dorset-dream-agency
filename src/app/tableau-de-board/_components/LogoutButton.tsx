import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PowerOff } from "lucide-react";
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
            } catch (error) {
                ToastErrorSonner(`Impossible  de vous déconnecter raison: ${error.message}`);
            }
        });
    };
    return (
        <ModalProvider>
            <DropdownMenuItem asChild>
                <Button
                    type="button"
                    onClick={logout}
                    className="font-semibold text-red-900 bg-destructive/30 hover:bg-destructive hover:text-white w-full"
                    disabled={isPending}
                >
                    <PowerOff className="h-4 w-4 mr-1" /> Déconnexion
                </Button>
            </DropdownMenuItem>
        </ModalProvider>
    );
};

export default LogoutButton;
