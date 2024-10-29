"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SimplePaginationProps = {
    rowLabel?: string;
    rowSizeSelect?: Array<number>;
};
const SimplePagination = ({
    rowLabel = "Éléments par page",
    rowSizeSelect = [5, 15, 25, 50],
    totalItem = 35,
    nextPage,
    limit = 5,
}: SimplePaginationProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");
    const pathname = usePathname();
    const router = useRouter();

    const updateRouteParams = (value: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set("page", value);
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
    };

    const [paginationState, setPaginationState] = React.useReducer((prev, next) => ({ ...prev, ...next }), {
        page: page || 1,
        limit,
        canNextPage: true,
        canPreviousPage: false,
    });

    const TOTAL_PAGE = Math.ceil(totalItem / paginationState.limit);
    const gotToLastPage = () => {
        setPaginationState({
            page: TOTAL_PAGE,
            canNextPage: false,
            canPreviousPage: true,
        });
        updateRouteParams(String(TOTAL_PAGE));
    };
    const goFirstPage = () => {
        setPaginationState({
            page: 1,
            canPreviousPage: false,
            canNextPage: true,
        });
        updateRouteParams("1");
    };

    const goPreviousPage = () => {
        const newPage = Number(paginationState.page) - 1;
        if (newPage === 1) {
            setPaginationState({ page: newPage, canNextPage: true, canPreviousPage: false });
            updateRouteParams(String(newPage));
            return;
        }

        setPaginationState({ page: newPage, canNextPage: true, canPreviousPage: true });
        updateRouteParams(String(newPage));
    };
    const goNextPage = () => {
        const newPage = Number(paginationState.page) + 1;
        if (newPage >= TOTAL_PAGE) {
            setPaginationState({ page: newPage, canNextPage: false, canPreviousPage: true });
            updateRouteParams(String(newPage));
            return;
        }

        setPaginationState({ page: newPage, canNextPage: true, canPreviousPage: false });
        updateRouteParams(String(newPage));
    };

    const handleSelectLimit = (value: any) => {
        const currentPage = Number(page);
        const newTotalPage = Math.ceil(totalItem / value);

        if (currentPage > newTotalPage) {
            setPaginationState({ limit: value, page: newTotalPage });
            updateRouteParams(String(newTotalPage));
            return;
        }

        setPaginationState({ limit: value });
    };

    return (
        <div className="flex items-center  px-2 my-3">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{rowLabel}</p>
                    <Select value={String(paginationState.limit)} onValueChange={handleSelectLimit}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={paginationState.limit} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                            {rowSizeSelect.map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {paginationState.page} sur {TOTAL_PAGE}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={goFirstPage}
                        disabled={!paginationState.canPreviousPage}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={goPreviousPage}
                        disabled={!paginationState.canPreviousPage}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={goNextPage}
                        disabled={!paginationState.canNextPage}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={gotToLastPage}
                        disabled={!paginationState.canNextPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SimplePagination;
