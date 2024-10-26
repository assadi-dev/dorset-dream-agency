import { usePathname, useRouter } from "next/navigation";

const useRouteRefresh = () => {
    const router = useRouter();
    const pathname = usePathname();
    const refresh = () => {
        router.push(pathname);
        router.refresh();
    };

    return {
        router,
        pathname,
        refresh,
    };
};

export default useRouteRefresh;
