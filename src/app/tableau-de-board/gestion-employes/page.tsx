import { setTitlePage } from "@/lib/utils";
import React from "react";
import ListEmployee from "./_components/ListEmployee";

export const metadata = setTitlePage("Employés");
const GestionEmployeePage = () => {
    return (
        <>
            <section className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Employés</h1>
                <p className="text-sm text-muted-foreground">Gestion des employés et creations des comptes</p>
            </section>
            <section>
                <ListEmployee />
            </section>
        </>
    );
};

export default GestionEmployeePage;
