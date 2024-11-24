import { setTitlePage } from "@/lib/utils";
import React from "react";
import ListEmployee from "./_components/ListEmployee";
import PageTemplate from "../_components/PageTemplate";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import ModalProvider from "@/components/Modals/ModalProvider";
import { getEmployeeCollections } from "@/database/drizzle/repositories/employee";
import { PaginationSearchParams } from "@/app/types";

const EmployeeCollection = async ({ filter }: any) => {
    const employee = await getEmployeeCollections(filter);
    return (
        employee && (
            <ListEmployee employees={employee?.data || []} limit={filter.limit} totalItems={employee?.totalItems} />
        )
    );
};

export const metadata = setTitlePage("Gestion des employés");
type GestionEmployeePageProps = {
    searchParams: PaginationSearchParams;
};
const GestionEmployeePage = async ({ searchParams }: GestionEmployeePageProps) => {
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 15;
    const search = searchParams.search || "";
    const filter = { search, page, limit };
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
