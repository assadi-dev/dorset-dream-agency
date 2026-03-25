import React from "react";
import PropertyCard from "../_components/main/PropertyCard";
import SimplePagination from "@/components/Paginations/SimplePagination";

type PropertyItemType = {
    id: number;
    name: string;
    cover: string;
    photo: string;
    category: {
        id: number;
        name: string;
    };
    rentalPrice: number;
    sellingPrice: number;
    isFurnish: boolean;
    isAvailable: boolean;
};
type ListPropertiesResultsSectionProps = {
    propertiesCollections: PropertyItemType[];
    totalItems: number;
    limit: number;

};
const ListPropertiesResultsSection = ({ propertiesCollections, totalItems, limit }: ListPropertiesResultsSectionProps) => {
    return (
        <section className="py-6">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Nombre de proprietes : {totalItems}</p>
                <div>
                    <SimplePagination totalItems={totalItems} limit={limit} />
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(18rem)] gap-5">
                {propertiesCollections.map((item) => (
                    <PropertyCard property={item} key={item.id} />
                ))}
            </div>
        </section>
    );
};

export default ListPropertiesResultsSection;
