import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import VariantCardItem from "./VariantCardItem";
import { PlusCircleIcon } from "lucide-react";
import useModalState from "@/hooks/useModalState";
import { useFormContext } from "react-hook-form";
import UploadZoneVariant from "../form/UploadZoneVariant";

const AddVariantProperty = () => {
    const { openModal } = useModalState();
    const form = useFormContext();

    const handleClickAddVariant = () => {
        openModal({
            title: "Ajouter une variante",
            component: UploadZoneVariant,
        });
    };

    const AddVariantCard = () => {
        return (
            <button
                type="button"
                className="bg-gradient-to-br from-primary to-primary/50 hover:bg-[rgba(0,0,0,0.55)] hover:text-white transition-all h-[130px] relative overflow-hidden rounded-xl  shadow-inner shadow-white/80 w-full active:opacity-50 grid place-items-center text-white hover:cursor-pointer"
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
        <div className="h-full  rounded-xl p-3 text-secondary bg-primary/50 ">
            <AddVariantCard />
            <ScrollArea className="p-3 lg:h-[calc(55vh-50px)]">
                <div className="w-full  grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(150px,250px))] gap-3">
                    {form.watch("variants").length > 0 &&
                        form.watch("variants").map((variant: any) => {
                            const defaultLink =
                                variant && variant.gallery
                                    ? variant.gallery.find((v: any) => v?.isCover)?.url
                                    : variant.gallery[0]?.url;
                            return <VariantCardItem variant={variant} key={variant?.id} previewLink={defaultLink} />;
                        })}
                </div>
                <div></div>
            </ScrollArea>
        </div>
    );
};

export default AddVariantProperty;
