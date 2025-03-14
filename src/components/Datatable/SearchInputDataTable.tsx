"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type SearchInputDataTableType = {
    value?: string | null;
    onSearch?: (value: string | null) => void;
    classNames?: {
        container?: string;
        input?: string;
        icon?: string;
    };
};
const SearchInputDataTable = ({ value, onSearch, classNames }: SearchInputDataTableType) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const searchTermInParam = searchParams.get("search") || "";

    const [searchTerm, setSearchTerm] = React.useState<string | null>(value || searchTermInParam);
    const { debouncedValue } = useDebounce(searchTerm, 500);

    React.useEffect(() => {
        const updateRouteParams = (value: string) => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set("search", value);
            const updatePathName = pathname + "?" + updatedSearchParams.toString();
            router.push(updatePathName);
        };

        const removeRouteParams = () => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.delete("search");
            const updatePathName = pathname + "?" + updatedSearchParams.toString();
            router.push(updatePathName);
        };

        if (debouncedValue) {
            updateRouteParams(debouncedValue);
            if (onSearch) onSearch(debouncedValue);
        } else {
            removeRouteParams();
            if (onSearch) onSearch(null);
        }
    }, [debouncedValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <div className={cn("relative w-full", classNames?.container)}>
            <Input
                type="search"
                value={searchTerm || ""}
                onChange={handleInputChange}
                className={cn("pr-10", classNames?.input)}
            />
            <Search
                className={cn("absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500", classNames?.icon)}
            />
        </div>
    );
};

export default SearchInputDataTable;
