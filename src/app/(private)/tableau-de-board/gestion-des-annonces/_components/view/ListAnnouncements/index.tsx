import AnnouncementCard from "./AnnouncementCard";
import EmptyAnnounce from "./EmptyAnnounce";
import { AnnouncementType } from "../../../type";

type ListAnnouncementsProps = {
    announcements: AnnouncementType[];
};
const ListAnnouncements = ({ announcements = [] }: ListAnnouncementsProps) => {
    return (
        <>
            {announcements.length > 0 ? (
                <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 justify-center">
                    {announcements.map((announce) => (
                        <AnnouncementCard key={announce.id} announce={announce} />
                    ))}
                </div>
            ) : (
                <EmptyAnnounce />
            )}
        </>
    );
};

export default ListAnnouncements;
