import React from "react";
import Announcement from "./sections/Announcement";
import LastTransaction from "./sections/LastTransaction";
import TransactionChart from "./sections/TransactionChart";
import PropertiesCountBar from "./sections/PropertiesCountBar";
import IncomeEmployee from "./sections/IncomeEmployee";

const DashboardBody = () => {
    return (
        <>
            <section className="my-3  grid grid-rows-2 sm:grid-rows-[auto] sm:grid-cols-2 gap-3 min-h-[300px]">
                <Announcement />
                {/*   <LastTransaction /> */}
                <IncomeEmployee />
            </section>
            <section className="my-3  grid grid-rows-2 sm:grid-rows-[auto] sm:grid-cols-2 gap-3 min-h-[300px]">
                <TransactionChart />
                <PropertiesCountBar />
            </section>
            <section className="my-3  grid grid-rows-2 sm:grid-rows-[auto] sm:grid-cols-2 gap-3 min-h-[300px]">
                {<LastTransaction />}
            </section>
        </>
    );
};

export default DashboardBody;
