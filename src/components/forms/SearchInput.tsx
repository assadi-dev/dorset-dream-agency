import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";

type SearchInputProps = InputProps & {
    classNames?: {
        inputWrapper: string;
    };
};
const SearchInput = ({ classNames, ...props }: SearchInputProps) => {
    return (
        <div className={cn("relative w-full max-w-sm", classNames?.inputWrapper)}>
            <Input type="search" {...props} className="pr-8" />
            <Search className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default SearchInput;
