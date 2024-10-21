import { User } from "next-auth";

export type GenderType = "Male" | "Female";

export type ActionsColumnType = {
    row: any;
};

export type UserCredential =
    | (User & {
          role: string;
          employeeID?: number;
          grade?: string;
      })
    | null;
