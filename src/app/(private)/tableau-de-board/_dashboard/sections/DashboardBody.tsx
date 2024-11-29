import React from "react";
import Announcement from "./Announcement";
import LastProperties from "./LastProperties";

const DashboardBody = () => {
    return (
        <section className="py-8 ">
            <div className="grid grid-rows-2 sm:grid-rows-[auto] sm:grid-cols-2 gap-3 min-h-[300px]">
                <Announcement />
                <LastProperties />
            </div>
        </section>
    );
};

export default DashboardBody;
