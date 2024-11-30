import React from "react";
import Announcement from "./sections/Announcement";
import LastTransaction from "./sections/LastTransaction";
import TransactionChart from "./sections/TransactionChart";
import PropertiesCountBar from "./sections/PropertiesCountBar";

const DashboardBody = () => {
    return (
        <>
            <section className="my-3  grid grid-rows-2 sm:grid-rows-[auto] sm:grid-cols-2 gap-3 min-h-[300px]">
                <Announcement />
                <LastTransaction />
            </section>
            <section className="my-3  grid grid-rows-2 sm:grid-rows-[auto] sm:grid-cols-2 gap-3 min-h-[300px]">
                <TransactionChart />
                <PropertiesCountBar />
            </section>
        </>
    );
};

export default DashboardBody;
