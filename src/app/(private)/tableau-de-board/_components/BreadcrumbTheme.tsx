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
    const allPathNames = paths.split("/").filter((path) => path);

    // Regex or strings to exclude from breadcrumbs
    const excludePatterns = [/availability/i];

    const breadcrumbItems = allPathNames
        .map((item, index) => {
            const href = `/${allPathNames.slice(0, index + 1).join("/")}`;
            return { item, href };
        })
        .filter(({ item }) => {
            return !excludePatterns.some((pattern) =>
                pattern instanceof RegExp ? pattern.test(item) : pattern === item
            );
        });

    const BreadcrumbLinkItem = ({ item, href }: { item: string; href: string }) => {
        return (
            <BreadcrumbLink asChild>
                <Link href={href}>{decodeURIComponent(item)}</Link>
            </BreadcrumbLink>
        );
    };

    return (
        <Breadcrumb className="rounded w-fit py-1  ">
            <BreadcrumbList>
                {breadcrumbItems?.map((breadcrumb, index) => {
                    const { item, href } = breadcrumb;
                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem>
                                {paths === href ? (
                                    <BreadcrumbPage>{decodeURIComponent(item)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLinkItem item={item} href={href} />
                                )}
                            </BreadcrumbItem>
                            {breadcrumbItems.length !== index + 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbTheme;
