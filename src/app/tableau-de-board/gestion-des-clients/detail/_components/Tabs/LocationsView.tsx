import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { LOCATION_COLUMNS } from "./columns";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import AddButton from "@/components/forms/AddButton";

const LocationsView = () => {
    return (
        <div className="grid grid-rows-[auto,1fr] mt-3">
            <section>
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                    <SearchInputDataTable />
                    <AddButton />
                </div>
            </section>
            <section className="h-[calc(100vh-220px)] self-end">
                <DataTable columns={LOCATION_COLUMNS} data={[]} />
            </section>
        </div>
    );
};

export default LocationsView;
