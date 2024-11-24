"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type paginationStateType = {
    page: number;
    limit: number;
    canNextPage: boolean;
    canPreviousPage: boolean;
    totalItems: number;
};
type SimplePaginationProps = {
    rowLabel?: string;
    rowSizeSelect?: Array<number>;
    totalItems: number;
    limit: number;
};
const SimplePagination = ({
    rowLabel = "Éléments par page",
    rowSizeSelect = [5, 15, 25, 50],
    totalItems = 0,
    limit = 5,
}: SimplePaginationProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const pathname = usePathname();
    const router = useRouter();

    const updateRouteParams = React.useCallback(
        (key: string, value: string) => {
            console.log(key, value);

            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set(key, value);
            const updatePathName = pathname + "?" + updatedSearchParams.toString();
            console.log(updatePathName);

            router.push(updatePathName);
        },
        [pathname, router, searchParams],
    );

    const [paginationState, setPaginationState] = React.useReducer(
        (prev: paginationStateType, next: any) => ({ ...prev, ...next }),
        {
            page: page || 1,
            limit,
            canNextPage: true,
            canPreviousPage: false,
            totalItems,
        },
    );

    const TOTAL_PAGE = totalItems === 0 ? 1 : Math.ceil(totalItems / paginationState.limit);
    const gotToLastPage = () => {
        setPaginationState({
            page: TOTAL_PAGE,
            canNextPage: false,
            canPreviousPage: true,
        });
        updateRouteParams("page", String(TOTAL_PAGE));
    };
    const goFirstPage = () => {
        setPaginationState({
            page: 1,
            canPreviousPage: false,
            canNextPage: false,
        });
        updateRouteParams("page", "1");
    };

    const goPreviousPage = () => {
        const newPage = Number(page) - 1;
        setPaginationState({ page: newPage });
        updateRouteParams("page", String(newPage));
    };
    const goNextPage = () => {
        const newPage = Number(page) + 1;
        setPaginationState({ page: newPage });
        updateRouteParams("page", String(newPage));
    };

    const handleSelectLimit = (value: any) => {
        setPaginationState({ limit: Number(value) });
        updateRouteParams("limit", String(value));
    };

    React.useEffect(() => {
        if (page) {
            const currentPage = Number(page);

            const obj = { page: currentPage, canNextPage: true, canPreviousPage: true };
            if (TOTAL_PAGE === 1) {
                obj.canPreviousPage = false;
                obj.canNextPage = false;
                updateRouteParams("page", String(obj.page));
            } else if (currentPage <= 1) {
                obj.page = 1;
                obj.canPreviousPage = false;
                updateRouteParams("page", String(obj.page));
            } else if (currentPage > 1 && currentPage < TOTAL_PAGE) {
                obj.canPreviousPage = true;
                obj.canNextPage = true;
            } else if (currentPage >= TOTAL_PAGE) {
                updateRouteParams("page", String(TOTAL_PAGE));
                obj.page = TOTAL_PAGE;
                obj.canNextPage = false;
            }
            setPaginationState(obj);
        }
    }, [totalItems, limit, page]);

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
                    Page {page} sur {TOTAL_PAGE}
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
