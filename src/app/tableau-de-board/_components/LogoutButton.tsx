import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useModalState from "@/hooks/useModalState";
import { wait } from "@/lib/utils";
import { PowerOff } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import LogoutLoader from "./LogoutLoader";

const LogoutButton = () => {
    const { openModal } = useModalState();

    const logout = () => {
        console.log("click");
        openModal({
            component: LogoutLoader,
        });
    };
    return (
        <DropdownMenuItem
            className="font-semibold text-red-900 bg-destructive/30 hover:bg-destructive hover:text-white w-full"
            disabled={isPending}
            onClick={logout}
        >
            <PowerOff className="h-4 w-4 mr-1" /> Déconnexion
        </DropdownMenuItem>
    );
};

export default LogoutButton;
