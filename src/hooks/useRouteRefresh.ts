import { usePathname, useRouter } from "next/navigation";

/**
 *
 * hook contenant les in de la route courante
 * contient la fonction refresh qui permet de rafraîchir le cache
 */
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
