import React from "react";

const PropertiesCategoryPage = ({ searchParams }) => {
    console.log(searchParams);

    return (
        <div className="min-h-screen w-full">
            <h1 className="font-semibold text-2xl mb-1">Catégorie: </h1>
            <p className="text-sm text-slate-500">Résultat trouvé 0</p>
        </div>
    );
};

export default PropertiesCategoryPage;
