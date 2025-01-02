"use client";

import { useQuery } from "@tanstack/react-query";
import AnnouncementCard from "./AnnouncementCard";
import EmptyAnnounce from "./EmptyAnnounce";
import LoadingAnnounce from "./LoadingAnnounce";
import { ANNOUNCEMENT_QUERY_KEY } from "../../../helper";

type ListAnnouncementsProps = {
    announcements: any[];
};
const ListAnnouncements = ({ announcements = [] }: ListAnnouncementsProps) => {
    return (
        <>
            {announcements.length > 0 ? (
                <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 justify-center">
                    {announcements.map((v, i) => (
                        <AnnouncementCard key={i} />
                    ))}
                </div>
            ) : (
                <EmptyAnnounce />
            )}
        </>
    );
};

export default ListAnnouncements;
