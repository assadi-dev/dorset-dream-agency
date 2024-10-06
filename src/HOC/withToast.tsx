import { Toaster } from "@/components/ui/toaster";
import React from "react";

function withToast<P extends object>(Component: React.ComponentType<P>) {
    return function WithToastComponent(props: P) {
        return (
            <>
                {/* Toaster pour afficher les notifications */}
                <Toaster />
                {/* Le composant enveloppé avec les props */}
                <Component {...props} />
            </>
        );
    };
}

export default withToast;
