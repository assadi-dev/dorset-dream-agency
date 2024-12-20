import { Role } from "@/app/types/user";
import { UserAdapter } from "@/auth";
import { User } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User extends UserAdapter {
        role: Role;
        employeeID?: number | null;
        grade?: string | null;
    }
}
