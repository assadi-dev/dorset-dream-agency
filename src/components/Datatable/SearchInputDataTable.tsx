"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import React from "react";

type SearchInputDataTable = {
    value: string | null;
    onSearch: (search: string) => void;
};
const SearchInputDataTable = ({ value }: SearchInputDataTable) => {
    const [searchTerm, setSearchTerm] = React.useState<string | null>(value);
    const { debouncedValue } = useDebounce(searchTerm, 500);

    /*     const debouncedSearch = useDebouncedCallback((value) => {
        // Perform your search logic here
        console.log("Searching for:", value);
    }, 300); // 300ms delay */

    React.useEffect(() => {
        if (debouncedValue) {
            console.log("Searching for: ", debouncedValue);
        }
    }, [debouncedValue]);

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
