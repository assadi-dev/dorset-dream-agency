"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CLIENT_TABS_DATA } from "./helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageTemplate from "@/app/(private)/tableau-de-board/_components/PageTemplate";

const TabsTest = () => {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab");
    const pathname = usePathname();
    const router = useRouter();

    const defaultValue = activeTab ? activeTab : CLIENT_TABS_DATA[0].value;
    const handleSelect = (value: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set("tab", value);
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
        router.refresh();
    };

    return (
        <Tabs defaultValue={defaultValue} className="w-full">
            <div className="flex justify-items-center p-3">
                <TabsList className="bg-primary/25 mx-auto h-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:block w-full lg:w-fit">
                    {CLIENT_TABS_DATA.map((tabs) => (
                        <TabsTrigger
                            className="lg:text-xl data-[state=active]:bg-primary data-[state=active]:text-primary-accent"
                            key={tabs.value}
                            value={tabs.value}
                            onClick={() => handleSelect(tabs.value)}
                        >
                            {tabs.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
            {CLIENT_TABS_DATA.map((tabs) => (
                <TabsContent key={tabs.value} value={tabs.value}>
                    {
                        <PageTemplate showPrevButton={false} title={tabs.title}>
                            {tabs.component ? <tabs.component /> : null}
                        </PageTemplate>
                    }
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default TabsTest;
