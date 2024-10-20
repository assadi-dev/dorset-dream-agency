import { SessionProvider } from "next-auth/react";

type AuthSessionProviderProps = {
    children: React.ReactNode;
    session?: any;
};
export const AuthSessionProvider = ({ children, session }: AuthSessionProviderProps) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
