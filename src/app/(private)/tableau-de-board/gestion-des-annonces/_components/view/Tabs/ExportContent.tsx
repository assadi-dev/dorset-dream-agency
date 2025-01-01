"use client";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Button } from "@/components/ui/button";
import { ImageDown, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormFieldTextarea from "@/components/forms/FormFieldTextarea";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/forms/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementFormType, AnnouncementSchema } from "../../../schema";
import { ToastErrorSonner, ToastInfoSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { wait } from "@/lib/utils";

const ExportContent = () => {
    const { canvas } = useFabricAction();
    const [isPending, startTransition] = React.useTransition();

    const hasObject = () => {
        if (!canvas) return;
        const objectsLength = canvas.getObjects().length;
        if (objectsLength === 0) {
            ToastInfoSonner("Pas d'objet à exporter");
            return false;
        }
        return true;
    };

    const exportToPng = React.useCallback(async () => {
        if (!canvas) return;
        if (!hasObject()) return;
        const dataUrl = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `annonce_${new Date().getTime()}.png`;
        link.click();
        link.remove();
    }, [canvas]);

    const exportToSVG = React.useCallback(async () => {
        if (!canvas) return;
        if (!hasObject()) return;
        const svg = canvas.toSVG();
        const blob = new Blob([svg], { type: "image/svg+xm" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `annonce_${new Date().getTime()}.svg`;
        link.click();
        link.remove();
    }, [canvas]);

    const form = useForm<AnnouncementFormType>({
        resolver: zodResolver(AnnouncementSchema),
    });

    const saveAnnounce: SubmitHandler<AnnouncementFormType> = async (values) => {
        startTransition(async () => {
            try {
                if (!hasObject()) return;
                await wait(3000);

                ToastSuccessSonner("Annonce sauvegardé");
            } catch (error) {
                ToastErrorSonner("Une erreur est survenu lors de la création de l'annonce");
            }
        });
    };

    return (
        <div className="flex flex-col gap-2  h-full  bg-white p-5 rounded-xl shadow-lg w-full text-xs">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(saveAnnounce)}>
                    <div className="my-3">
                        <FormFieldInput
                            control={form.control}
                            type="text"
                            label=""
                            placeholder="Titre de l’annonce"
                            name="title"
                        />
                    </div>
                    <div className="my-3">
                        <FormFieldTextarea
                            control={form.control}
                            name="description"
                            label=""
                            placeholder="Description"
                            className="resize-y"
                            rows={4}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <SubmitButton
                            variant={"outline"}
                            isLoading={false}
                            size={"sm"}
                            type="button"
                            onClick={exportToPng}
                            className="w-full"
                        >
                            <ImageDown className="w-4 h-4" />
                            Export PNG
                        </SubmitButton>
                        <SubmitButton
                            variant={"outline"}
                            isLoading={false}
                            size={"sm"}
                            type="button"
                            onClick={exportToSVG}
                            className="w-full"
                        >
                            <ImageDown className="w-4 h-4" /> Export SVG
                        </SubmitButton>
                        <SubmitButton isLoading={isPending} size={"sm"} type="submit" className="w-full">
                            {isPending ? (
                                "Sauvegarde en cours..."
                            ) : (
                                <p className="flex items-center gap-1">
                                    <Save className="w-4 h-4" /> Sauvegarder
                                </p>
                            )}
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ExportContent;
