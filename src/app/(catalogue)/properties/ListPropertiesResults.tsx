import React from "react";
import PropertyCard from "../_components/main/PropertyCard";

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
};
const ListPropertiesResultsSection = ({ propertiesCollections }: ListPropertiesResultsSectionProps) => {
    return (
        <section className="py-6">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(23rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(14rem)] gap-5">
                {propertiesCollections.map((item) => (
                    <PropertyCard property={item} key={item.id} />
                ))}
            </div>
        </section>
    );
};

export default ListPropertiesResultsSection;
