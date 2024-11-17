"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const EmptyEmployee = () => {
    const searchParam = useSearchParams();
    const search = searchParam.get("search");

    const EMPTY_MESSAGE = search ? (
        <p>
            Aucun employé trouvé correspondant à la recherche <strong className="mx-1">{search}</strong>
        </p>
    ) : (
        `Aucun employé enregistré`
    );
    return (
        <div className="w-full flex justify-center p-3">
            <p className="text-gray-500">{EMPTY_MESSAGE}</p>
        </div>
    );
};

export default EmptyEmployee;
