"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_ARRAY_ELEMENT } from "./helper";
import { Session } from "../../type";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData, QUERY_EMPLOYEE_ACCOUNT_QUERY } from "../helpers";
import LoadingTabs from "../loading/LoadingTabs";

type ProfilTabsProps = {
    session: Session;
};
const ProfilTabs = ({ session }: ProfilTabsProps) => {
    const employeeID = session.user.employeeID;
    const { data, isError, isFetching } = useQuery({
        queryKey: [QUERY_EMPLOYEE_ACCOUNT_QUERY.GET_EMPLOYEE_ACCOUNT],
        queryFn: fetchEmployeeData,
    });
    /*  return <LoadingTabs />; */
    return (
        <Tabs defaultValue="account" className="w-[50vw] mx-auto  ">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow border">
                {TAB_ARRAY_ELEMENT.map((item) => (
                    <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        {item.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {TAB_ARRAY_ELEMENT.map((item) => (
                <TabsContent key={item.id} value={item.id}>
                    {item.component}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default ProfilTabs;
