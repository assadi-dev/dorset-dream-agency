import AnnouncementCard from "./AnnouncementCard";
import EmptyAnnounce from "./EmptyAnnounce";
import { AnnouncementType } from "../../../type";
import ModalProvider from "@/components/Modals/ModalProvider";

type ListAnnouncementsProps = {
    announcements: AnnouncementType[];
};
const ListAnnouncements = ({ announcements = [] }: ListAnnouncementsProps) => {
    return (
        <ModalProvider>
            {announcements.length > 0 ? (
                <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 justify-center transition-all">
                    {announcements.map((announce) => (
                        <AnnouncementCard key={announce.id} announce={announce} />
                    ))}
                </div>
            ) : (
                <EmptyAnnounce />
            )}
        </ModalProvider>
    );
};

export default ListAnnouncements;
