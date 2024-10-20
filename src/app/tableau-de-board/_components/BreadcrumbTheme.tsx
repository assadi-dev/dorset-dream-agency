"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadcrumbTheme = () => {
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);

    const BreadcrumbLinkItem = ({ item, href }: { item: string; href: string }) => {
        return (
            <BreadcrumbLink asChild>
                <Link href={href}>{item}</Link>
            </BreadcrumbLink>
        );
    };

    return (
        <Breadcrumb className="bg-primary-foreground rounded w-fit py-1  my-3">
            <BreadcrumbList>
                {pathNames?.map((item, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join("/")}`;
                    return (
                        <React.Fragment key={item}>
                            <BreadcrumbItem>
                                {paths === href ? (
                                    <BreadcrumbPage>{item}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLinkItem item={item} href={href} />
                                )}
                            </BreadcrumbItem>
                            {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbTheme;
