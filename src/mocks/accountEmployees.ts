import { ENV_TEST } from "~/vitest.setup";

export const accountEmployeeMocks = [
    {
        username: `admin@${ENV_TEST.EMAIL_DNS}`,
        password: "password",
        lastName: "Celer",
        firstName: "Jack",
        gender: "Male",
        phone: `${ENV_TEST.PHONE_COUNTRY_CODE}-1234`,
        role: "admin",
    },
    {
        username: `nick-fury@${ENV_TEST.EMAIL_DNS}`,
        password: "password",
        lastName: "Fury",
        firstName: "Nick",
        gender: "Male",
        phone: `${ENV_TEST.PHONE_COUNTRY_CODE}-4367`,
        role: "user",
    },
    {
        username: `sarah-morgan@${ENV_TEST.EMAIL_DNS}`,
        password: "password",
        lastName: "Morgan",
        firstName: "Sarah",
        gender: "Female",
        phone: `${ENV_TEST.PHONE_COUNTRY_CODE}-2298`,
        role: "user",
    },
];
