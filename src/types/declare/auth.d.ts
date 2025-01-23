import NextAuth, { Session, User } from "next-auth";

declare module "next-auth" {
    interface User {
        role: Role;
        employeeID?: number | null;
        grade?: string | null;
    }
}
