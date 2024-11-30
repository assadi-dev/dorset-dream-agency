import { Input, InputProps } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

type SearchInputProps = InputProps;
const SearchInput = ({ ...props }: SearchInputProps) => {
    return (
        <div className="relative w-full max-w-sm">
            <Input type="search" className="pr-8" {...props} />
            <Search className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default SearchInput;
