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

export type PaginationSearchParams = {
    search: string;
    limit: string;
    page: string;
};

export enum DayEnum {
    MONDAY = "Lundi",
    TUESDAY = "Mardi",
    WEDNESDAY = "Mercredi",
    THURSDAY = "Jeudi",
    FRIDAY = "Vendredi",
    SATURDAY = "Samedi",
    SUNDAY = "Dimanche",
}
export enum MonthEnum {
    JANUARY = "Janvier",
    FEBRUARY = "Février",
    MARCH = "Mars",
    APRIL = "Avril",
    MAY = "Mai",
    JUNE = "Juin",
    JULY = "Juillet",
    AUGUST = "Août",
    SEPTEMBER = "Septembre",
    OCTOBER = "Octobre",
    NOVEMBER = "Novembre",
    DECEMBER = "Décembre",
}
