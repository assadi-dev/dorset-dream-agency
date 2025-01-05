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
import { loadGoogleFont, wait } from "@/lib/utils";
import { saveAnnonceCreation } from "../../../ajouter/actions";
import { convertBlobToFile } from "@/lib/convertFile";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { useSearchParams } from "next/navigation";
import { fetchOneAnnounce } from "../../../modifier/helpers";

type ExportContentProps = {
    isEdit?: boolean;
    defaultValues?: Partial<AnnouncementFormType>;
};
const ExportContent = ({ isEdit, defaultValues }: ExportContentProps) => {
    const { canvas, layers } = useFabricAction();
    const [isPending, startTransition] = React.useTransition();

    const { searchParams, router, refreshWithParams } = useRouteRefresh();

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
        const fontData = await loadGoogleFont();

        const svgWithFont = svg.replace(`<defs>`, `<defs><style type="text/css">${fontData}</style>`);
        const mimetype = "image/svg+xml";

        const blob = new Blob([svgWithFont], { type: mimetype });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `annonce_${new Date().getTime()}.svg`;
        link.click();
        link.remove();
    }, [canvas]);

    const form = useForm<AnnouncementFormType>({
        resolver: zodResolver(AnnouncementSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const saveAnnounce: SubmitHandler<AnnouncementFormType> = async (values) => {
        if (searchParams.get("id")) values.id = Number(searchParams.get("id"));

        startTransition(async () => {
            try {
                if (!canvas) return;
                if (!hasObject()) return;

                const formData = new FormData();
                if (values.id) formData.append("announceID", String(values.id));

                //Generation du fichier svg
                const fileName = `announcement_${Date.now()}.svg`;
                const mimetype = "image/svg+xml";

                const svg = canvas.toSVG();
                const fontData = await loadGoogleFont();
                const svgWithFont = svg.replace(`<defs>`, `<defs><style type="text/css">${fontData}</style>`);

                const blob = new Blob([svgWithFont], { type: mimetype });
                const creationFile = await convertBlobToFile({ name: fileName, blob, mimetype });

                formData.append("announce", creationFile);

                //Génération du fichier
                const canvasObjectJson = canvas.toJSON();
                canvasObjectJson.objects = canvasObjectJson.objects.map((v: any, i: any) => ({
                    ...v,
                    id: layers[i].id,
                    name: layers[i].id,
                    zIndex: layers[i].zIndex,
                    width: layers[i].width,
                    height: layers[i].height,
                    stroke: layers[i].stroke,
                    strokeWidth: layers[i].strokeWidth,
                    strokeStyle: layers[i].strokeStyle,
                    borderRadius: layers[i].borderRadius,
                    angle: layers[i].angle,
                    radius: layers[i].radius,
                    fontFamily: layers[i].fontFamily,
                    fontSize: layers[i].fontSize,
                    fontWeight: layers[i].fontWeight,
                    lineHeight: layers[i].lineHeight,
                }));
                const canvasObjectFileName = fileName.replace("svg", "json");
                const canvasObjectMimetype = "application/json";
                const canvasObjectBlob = new Blob([JSON.stringify(canvasObjectJson)], { type: canvasObjectMimetype });
                const canvasObjectSaveFile = await convertBlobToFile({
                    name: canvasObjectFileName,
                    blob: canvasObjectBlob,
                    mimetype: canvasObjectMimetype,
                });

                formData.append("save", canvasObjectSaveFile);
                const saveAnnonce = await saveAnnonceCreation(formData, values);
                ToastSuccessSonner("Annonce sauvegardé");
                // saveAnnonce && updateSearchParamAndRefresh("id", String(saveAnnonce.id));
                /*    saveAnnonce && !searchParams.get("id")
                    router.push(`/tableau-de-board/gestion-des-annonces/modifier?id=${String(saveAnnonce?.id)}`); */
                searchParams.get("id") ? refreshWithParams() : router.push(`/tableau-de-board/gestion-des-annonces`);
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
