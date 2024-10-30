"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type SearchInputDataTable = {
    value?: string | null;
    onSearch?: (value: string) => void;
};
const SearchInputDataTable = ({ value, onSearch }: SearchInputDataTable) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const updateRouteParams = React.useCallback(
        (value: string) => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set("search", value);
            const updatePathName = pathname + "?" + updatedSearchParams.toString();
            router.push(updatePathName);
        },
        [pathname, router, searchParams],
    );

    const searchTermInParam = searchParams.get("search") || "";

    const [searchTerm, setSearchTerm] = React.useState<string | null>(value || searchTermInParam);
    const { debouncedValue } = useDebounce(searchTerm, 500);

    React.useEffect(() => {
        if (debouncedValue) {
            updateRouteParams(debouncedValue);
            if (onSearch) onSearch(debouncedValue);
        }
    }, [debouncedValue, onSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <div className="relative w-full max-w-sm">
            <Input type="search" value={searchTerm} onChange={handleInputChange} className="pr-10" />
            <Search className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default SearchInputDataTable;
