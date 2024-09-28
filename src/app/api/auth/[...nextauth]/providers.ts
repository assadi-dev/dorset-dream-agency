import { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type UserCredential = User & {
    role: string;
};

export const credentials = Credentials({
    credentials: {
        email: {
            label: "Email",
            name: "email",
            type: "email",
        },
        password: {
            label: "Mot de passe",
            name: "password",
            type: "password",
        },
    },
    authorize: async (
        credentials: Partial<Record<"email" | "password", unknown>>,
        req: any,
    ): Promise<UserCredential> => {
        try {
            const user = {
                id: "1",
                name: "John Doe",
                email: String(credentials.email),
                image: "https://i.pravatar.cc/300",
                role: "admin",
            } satisfies UserCredential;

            return user;
        } catch (error: any) {
            return null;
        }
    },
});
