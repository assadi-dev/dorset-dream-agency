"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_ARRAY_ELEMENT } from "./helper";
import { UserData } from "../../type";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData, QUERY_EMPLOYEE_ACCOUNT_QUERY } from "../helpers";
import LoadingTabs from "../loading/LoadingTabs";

type ProfilTabsProps = {
    userData: UserData;
};
const ProfilTabs = ({ userData }: ProfilTabsProps) => {
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
                    {<item.component userData={userData} />}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default ProfilTabs;
