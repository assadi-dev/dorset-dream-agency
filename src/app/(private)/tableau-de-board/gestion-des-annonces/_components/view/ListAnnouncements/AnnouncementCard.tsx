"use client";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CircleUser, Pencil, Trash2, User2 } from "lucide-react";
import React from "react";
import { EllipsisVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnnouncementBadges from "./AnnouncementBadges";
import { AnnouncementType } from "../../../type";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { publish } from "../../../actions";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import useModalState from "@/hooks/useModalState";
import ConfirmDeleteAnnonce from "../modal/ConfrmDeleteAnnonce";

type AnnouncementCardProps = {
    announce: AnnouncementType;
};
const AnnouncementCard = ({ announce }: AnnouncementCardProps) => {
    const img = `/api/${announce.path}`;
    const { refreshWithParams } = useRouteRefresh();
    const { openModal } = useModalState();

    const handleSwitchPublish = async (checked: boolean) => {
        try {
            await publish({
                id: announce.id,
                value: checked,
            });
            ToastSuccessSonner("Annonce publié");
            refreshWithParams();
        } catch (error) {
            ToastErrorSonner("");
        }
    };

    const handleClickDelete = () => {
        openModal({
            title: "Supprimer l'annonce",
            description: `Voulez-vous supprimer l'annonce ${announce.title} ?`,
            component: ConfirmDeleteAnnonce,
            payload: announce,
            onInteractOutside: false,
        });
    };

    return (
        <>
            <Card className=" grid grid-rows-[1fr,auto] gap-3 p-2 w-full bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-lg shadow-inner shadow-white  has-[.active-announce]:from-lime-600 has-[.active-announce]:border  has-[.active-announce]:to-lime-400 has-[.active-announce]:shadow-lime-600  transition-all">
                <div className="  bg-slate-950 backdrop-blur-lg rounded-lg shadow-inner shadow-white/50 relative overflow-hidden">
                    <div className="w-full absolute top-0 left-0 py-1"></div>
                    <embed
                        src={img}
                        role="img"
                        aria-description={`fiche d'annonce intitulé ${announce?.title}`}
                        className="object-cover object-center w-full h-[190px] rounded-lg"
                        type="image/svg+xml"
                    />
                </div>
                <div className="flex flex-col gap-1 min-h-[45px] relative bg-slate-900 shadow-inner shadow-white/65 backdrop-blur-lg py-2 px-3 rounded-lg h-fit self-end overflow-hidden">
                    <div className="flex gap-2 items-center">
                        {announce.isPublish && <AnnouncementBadges />}
                        <p className="text-xs lg:text-sm font-bold max-w-[80%] text-nowrap text-ellipsis overflow-x-hidden flex gap-1 items-center">
                            {announce.title}
                        </p>
                    </div>
                    <div className="flex items-center h-full">
                        <div>
                            <p className="flex items-center flex-nowrap gap-1 text-xs text-gray-400 ">
                                <CircleUser className="h-4 w-4" /> {announce.author}
                            </p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="absolute right-1 top-2 p-1  text-xs transition hover:bg-white/25 rounded-full "
                                >
                                    <EllipsisVertical className="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-24 text-xs">
                                <DropdownMenuItem className="text-xs flex justify-between items-center">
                                    <label htmlFor="publish">Publier</label>
                                    <Switch
                                        id="publish"
                                        defaultChecked={announce.isPublish || false}
                                        onCheckedChange={handleSwitchPublish}
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs flex  items-center gap-1" disabled={true}>
                                    <Pencil className="w-4 h-3.5" /> Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-xs flex  items-center gap-1"
                                    onClick={handleClickDelete}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Supprimer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default AnnouncementCard;
