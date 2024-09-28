import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/connexion");
    }

    console.log(session);

    const signOutBtn = async () => {
        "use server";
        await signOut();
    };

    return (
        <div>
            <h1>Admin</h1>
            <div>
                <p>{session.user?.name}</p>
            </div>
            <form action={signOutBtn}>
                <Button>Déconnexion</Button>
            </form>
        </div>
    );
};

export default AdminLayout;
