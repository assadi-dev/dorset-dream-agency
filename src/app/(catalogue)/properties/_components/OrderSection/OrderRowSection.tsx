import React from "react";
import OrderSelect from "./OrderSelect";

const OrderRowSection = () => {
    return (
        <div className="flex justify-end items-center gap-3 flex-nowrap">
            <p className="font-semibold text-slate-500">Ordre d'affichage: </p>
            <OrderSelect />
        </div>
    );
};

export default OrderRowSection;
