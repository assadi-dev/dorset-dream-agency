"use client";

import AnnouncementCard from "./AnnouncementCard";

const ListAnnouncements = () => {
    const arrayFill = new Array(25).fill("dddd");

    return (
        <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 justify-center">
            {arrayFill.map((v, i) => (
                <AnnouncementCard key={i} />
            ))}
        </div>
    );
};

export default ListAnnouncements;
