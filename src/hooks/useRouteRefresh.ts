import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 *
 * hook contenant les in de la route courante
 * contient la fonction refresh qui permet de rafraîchir le cache
 */
const useRouteRefresh = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const refresh = () => {
        router.push(pathname);
        router.refresh();
    };

    const updateSearchParamAndRefresh = (name: string, value: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set(name, value);
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
        router.refresh();
    };
    const updateSearchParamWitObjectAndRefresh = (params: Record<string, string>) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        Object.keys(params).forEach((key) => {
            const value = params[key];
            updatedSearchParams.set(key, value);
        });
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
        router.refresh();
    };
    const refreshWithParams = () => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
        router.refresh();
    };

    return {
        router,
        pathname,
        searchParams,
        refresh,
        refreshWithParams,
        updateSearchParamAndRefresh,
        updateSearchParamWitObjectAndRefresh,
    };
};

export default useRouteRefresh;
