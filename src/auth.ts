import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import { credentials } from "./app/api/auth/[...nextauth]/providers";
import { ENV } from "./config/global";

type UserAdapter = User & {
    role: string;
    employeeID?: number | null;
    grade?: string | null;
};
export type UserSession = Session & {
    user: UserAdapter;
};

const authOptions = {
    providers: [credentials],
    callbacks: {
        jwt: async ({ trigger, token, user, account, session }) => {
            if (account?.provider === "credentials") {
                return {
                    ...user,
                    ...token,
                };
            }

            if (trigger === "update" && session) {
                return {
                    ...token,
                    ...session.user,
                };
            }
            return {
                ...token,
                ...session,
            };
        },
        session: async (params) => {
            const userSession: UserSession = {
                ...params.session,
                user: {
                    ...params.session.user,
                    id: String(params.token.id),
                    role: String(params.token.role),
                    employeeID: Number(params.token.employeeID) || null,
                    grade: String(params.token.grade),
                },
            };

            return userSession;
        },
    },

    pages: {
        signIn: ENV.NEXT_AUTH_SIGN_IN_PAGE,
        signOut: ENV.NEXT_AUTH_SIGN_OUT_REDIRECT,
    },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
