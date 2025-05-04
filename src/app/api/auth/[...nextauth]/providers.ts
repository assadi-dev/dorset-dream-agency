import { getUserData } from "@/app/connexion/action";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
    authorize: async (credentials: Partial<Record<"username" | "password", unknown>>, req: Request) => {
        try {
            const user = await getUserData(credentials);
            return user;
        } catch (error: unknown) {
            const credentialError = new CredentialsSignin();
            if (error instanceof Error) {
                credentialError.type = "CredentialsSignin";
                credentialError.code = error.message;
                credentialError.message = error.message;
            }

            throw credentialError;
        }
    },
});
