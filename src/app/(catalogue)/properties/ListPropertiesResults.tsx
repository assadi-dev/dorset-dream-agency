import React from "react";
import PropertyCard from "../_components/main/PropertyCard";

const ListPropertiesResultsSection = () => {
    const array = new Array(25).fill({ name: "sdsdd" });
    return (
        <section className="py-6">
            <div className="lg:grid grid-cols-[repeat(auto-fill,25.6rem)] lg:grid-rows-[repeat(14rem)] gap-5 justify-between">
                {array.map((item, index) => (
                    <PropertyCard key={index} />
                ))}
            </div>
        </section>
    );
};

export default ListPropertiesResultsSection;
