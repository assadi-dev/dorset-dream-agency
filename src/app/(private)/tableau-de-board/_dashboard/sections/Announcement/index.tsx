"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Cog } from "lucide-react";
import Image from "next/image";
import React from "react";
import { DASHBOARD_CARD_QUERY, fetchAnnounce } from "../../helper";
import Loader from "./Loader";

const Announcement = () => {
    const { data, isFetching } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_ANNOUNCE],
        queryFn: fetchAnnounce,
        refetchOnMount: true,
    });

    if (isFetching)
        return (
            <Card className="bg-primary text-white overflow-hidden">
                <Loader />{" "}
            </Card>
        );

    return (
        <Card className="bg-primary text-white overflow-hidden">
            {data?.url ? (
                <embed
                    src="http://localhost:3000/api/announcements/creations/1735783599597.svg"
                    type="image/svg+xml"
                    className="w-full"
                    role="img"
                    aria-description="Affichage des annonce"
                />
            ) : (
                <div className="h-full flex flex-col justify-center items-center gap-3">
                    <p className="text-white text-xl font-bold">Pas d'annonce</p>
                </div>
            )}
        </Card>
    );
};

export default Announcement;
