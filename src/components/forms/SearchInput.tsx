import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchInput = () => {
    return (
        <div className="relative w-full max-w-sm">
            <Input type="search" className="pr-8" />
            <Search className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default SearchInput;
