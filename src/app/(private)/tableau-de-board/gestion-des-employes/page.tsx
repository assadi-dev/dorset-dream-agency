import { setTitlePage } from "@/lib/utils";
import React from "react";
import ListEmployee from "./_components/ListEmployee";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ModalProvider from "@/components/Modals/ModalProvider";
import { getEmployeeCollections } from "@/database/drizzle/repositories/employee";

const EmployeeCollection = async ({ filter }: any) => {
    const employee = await getEmployeeCollections(filter);
    return <ListEmployee employees={employee} />;
};

export const metadata = setTitlePage("Gestion des employés");
type GestionEmployeePageProps = {
    searchParams: { search: string };
};
const GestionEmployeePage = async ({ searchParams: { search } }: GestionEmployeePageProps) => {
    const filter = { search };
    return (
        <ModalProvider>
            <PageTemplate title="Employés" description="Gestion des employés et creations des comptes">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <SearchInputDataTable />
                    </div>

                    <EmployeeCollection filter={filter} />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default GestionEmployeePage;
