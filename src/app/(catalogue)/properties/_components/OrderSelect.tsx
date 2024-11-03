"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { ArrowDownUp, MoreHorizontal, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type OrderType = "desc" | "asc";
const OrderSelect = () => {
    const searchParams = useSearchParams();
    const order = searchParams.get("order") as OrderType;
    const pathname = usePathname();
    const router = useRouter();

    const [state, setState] = React.useState<OrderType>(order);

    console.log(order);

    const updateRouteParams = React.useCallback(
        (value: string) => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set("order", value);
            const updatePathName = pathname + "?" + updatedSearchParams.toString();
            router.push(updatePathName);
        },
        [pathname, router, searchParams],
    );

    const handleSelectOrder = (value: OrderType) => {
        setState(value);
        updateRouteParams(value);
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0">
                        <span className="sr-only">Trier</span>

                        <ArrowDownUp className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="text-center">Trier</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={state === "desc"}
                        onCheckedChange={() => handleSelectOrder("desc")}
                    >
                        DESC
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={state === "asc"}
                        onCheckedChange={() => handleSelectOrder("asc")}
                    >
                        ASC
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default OrderSelect;
