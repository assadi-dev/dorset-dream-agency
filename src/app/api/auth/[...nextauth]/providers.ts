import { getUserData } from "@/app/connexion/action";
import { authenticate } from "@/database/drizzle/repositories/users";
import { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export type UserCredential = User & {
    role: string;
    employeeID: number;
    grade?: string;
};

export const credentials = Credentials({
    credentials: {
        username: {
            label: "Email",
            name: "username",
            type: "email",
        },
        password: {
            label: "Mot de passe",
            name: "password",
            type: "password",
        },
    },
    authorize: async (credentials: Record<"username" | "password", string>, req: any): Promise<UserCredential> => {
        try {
            const user = await getUserData(credentials);
            return user;
        } catch (error: any) {
            return null;
        }
    },
});
