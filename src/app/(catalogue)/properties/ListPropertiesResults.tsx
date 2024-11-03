import React from "react";
import PropertyCard from "../_components/main/PropertyCard";

const ListPropertiesResultsSection = () => {
    const array = new Array(25).fill({ name: "sdsdd" });
    return (
        <section className="py-6">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(23rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(14rem)] gap-5">
                {array.map((item, index) => (
                    <PropertyCard key={index} />
                ))}
            </div>
        </section>
    );
};

export default ListPropertiesResultsSection;
