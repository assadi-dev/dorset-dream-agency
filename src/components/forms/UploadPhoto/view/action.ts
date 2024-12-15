"use server";

import { auth, unstable_update } from "@/auth";

export const updateImageSession = async (formData: FormData) => {
    const session = await auth();
    if (!formData.get("photo")) throw new Error("photo is empty");
    const photo = formData.get("photo") as string;

    await unstable_update({
        ...session,
        user: {
            ...session?.user,
            name: "tata",
            image: photo,
        },
    });
};
