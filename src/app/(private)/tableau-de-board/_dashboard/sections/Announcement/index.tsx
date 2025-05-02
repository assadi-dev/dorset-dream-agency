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
                <Loader />
            </Card>
        );

    return (
        <Card className="bg-primary text-white overflow-hidden">
            {data?.url ? (
                <embed
                    src={data?.url}
                    type="image/svg+xml"
                    className="w-full h-full"
                    role="img"
                    aria-description={`fiche d'annonce intitulé ${data?.title}`}
                />
            ) : (
                <div className="h-full flex flex-col justify-center items-center gap-3 w-full">
                    <p className="text-white text-xl font-bold">Pas d'annonce</p>
                </div>
            )}
        </Card>
    );
};

export default Announcement;
