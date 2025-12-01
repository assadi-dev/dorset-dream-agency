type FetchWithAuthorizationArgs = {
    input: string | URL | globalThis.Request;
    init?: RequestInit;
    Authorization: string;
};
export const fetchWithAuthorization = ({ input, init, Authorization }: FetchWithAuthorizationArgs) => {
    return fetch(input, {
        ...init,
        headers: {
            ...init?.headers,
            ["Content-Type"]: "application/json",
            Authorization,
        },
    });
};
