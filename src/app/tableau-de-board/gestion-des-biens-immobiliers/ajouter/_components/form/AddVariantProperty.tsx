import React from "react";
import FormVariantProperty from "./FormVariantProperty";
import AddButton from "@/components/forms/AddButton";
import { PlusCircleIcon } from "lucide-react";
import useModalState from "@/hooks/useModalState";
import UploadZoneModal from "./UploadZoneModal";

const AddVariantProperty = () => {
    const { openModal } = useModalState();

    const handleClickAddVariant = () => {
        console.log("open add variant clicked !");
        openModal({
            title: "Ajouter une variante",
            component: UploadZoneModal,
        });
    };

    const AddVariantCard = () => {
        return (
            <button
                type="button"
                className="bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.55)] hover:text-white transition-all h-[130px] relative overflow-hidden rounded-xl  border border-slate-500 w-full active:opacity-50 grid place-items-center text-primary hover:cursor-pointer"
                onClick={handleClickAddVariant}
            >
                <div className="flex flex-col items-center space-y-1">
                    <PlusCircleIcon />
                    <p className="text-xs font-bold">Ajouter une variante</p>
                </div>
            </button>
        );
    };

    return (
        <div className="h-full  rounded-xl p-3 bg-slate-300 text-secondary">
            <AddVariantCard />
            <FormVariantProperty />
        </div>
    );
};

export default AddVariantProperty;
